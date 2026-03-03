#importing dependencies
from fastapi import FastAPI, Depends, status
from fastapi.security import HTTPBearer,  HTTPAuthorizationCredentials
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel, EmailStr, field_validator
from jose import jwt, JWTError
from fastapi.concurrency import run_in_threadpool
import bcrypt
import re

#--------------------
# Importing Schema's
#--------------------

from app.schemas.user_schema import CreateUser, LoginSchema, LogoutSchema

#--------------------
# Importing Database
#--------------------
from app.mongodb.connect import connectdb


#------------------------
# Database Connections
#------------------------

#db for signup
db = connectdb()
signup_collection = db["signup"]



"""
App Created
"""
app = FastAPI()



"""
SECURITY CODES
"""

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, use specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#JWT TOKEN

SECRET_KEY = "aakash-hitakshi-khushi"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


#SECURITY
security = HTTPBearer()




"""
All the APIS for AUTHENTICATION
--
| Method | Endpoint             | Purpose                    |
| ------ | -------------------- | -------------------------- |
| POST   | `/auth/signup`       | Create new student account | done
| POST   | `/auth/login`        | Login and generate JWT     | done
| POST   | `/auth/logout`       | Logout user                | done
| GET    | `/auth/me`           | Get current logged-in user | done
| POST   | `/auth/refresh`      | Refresh access token       |  
| POST   | `/auth/verify-email` | Verify college email       |

"""

#----------------------------
# Create new student account
#----------------------------

@app.post("/auth/signup", status_code=status.HTTP_201_CREATED)
async def sign_up(user: CreateUser):

    from fastapi.concurrency import run_in_threadpool

    # 1️. Confirm passwords match
    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )

    # 2️. Check if email already exists
    existing_email = await run_in_threadpool(
        signup_collection.find_one, {"email": user.email.lower()}
    )

    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    # 3️. Check if phone already exists
    existing_phone = await run_in_threadpool(
        signup_collection.find_one, {"phone": user.phone}
    )

    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Phone number already registered"
        )

    # 4️. Hash password
    hashed_pw = await run_in_threadpool(
        bcrypt.hashpw, user.password.encode(), bcrypt.gensalt(rounds=8)
    )

    new_user = {
        "name": user.name,
        "email": user.email.lower(),
        "password": hashed_pw,
        "campus": user.campus,
        "phone": user.phone,
        "year": user.year,
    }

    # 5️. Insert user
    try:
        result = await run_in_threadpool(signup_collection.insert_one, new_user)
        return {"status": "ok", "user_id": str(result.inserted_id)}

    except DuplicateKeyError:
        # Safety fallback (race condition protection)
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email or phone already registered"
        )

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
    



#----------------------------
# API FOR SIGN IN USER
#----------------------------

@app.post("/auth/login", status_code=status.HTTP_200_OK)
async def login(user: LoginSchema):

    # 1️. Normalize email
    email = user.email.lower()

    # 2️. Fetch user (indexed lookup → O(log n))
    db_user = await run_in_threadpool(
        signup_collection.find_one,
        {"email": email}
    )

    # 3️. Always verify password safely
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # 4️. Verify bcrypt hash (constant time)
    password_valid = await run_in_threadpool(
        bcrypt.checkpw,
        user.password.encode(),
        db_user["password"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # 5️. Generate JWT token
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {
        "sub": str(db_user["_id"]),
        "email": db_user["email"],
        "exp": expire
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "status": "ok",
        "access_token": token,
        "token_type": "bearer"
    }



#----------------------------
# API FOR LOG OUT
#----------------------------


@app.post("/auth/logout", status_code=status.HTTP_200_OK)
async def logout():
    return {"status": "ok", "message": "Logged out successfully"}



#----------------------------
# API FOR GET MY INFORMATION
#----------------------------

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    db_user = await run_in_threadpool(
        signup_collection.find_one,
        {"_id": ObjectId(user_id)}
    )

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return db_user



@app.get("/auth/me", status_code=status.HTTP_200_OK)
async def get_me(current_user=Depends(get_current_user)):

    user_info = {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"],
        "year": current_user["year"],
        "phone": current_user["phone"],
        "campus": current_user["campus"],
        "is_verified": current_user.get("is_verified", False),
        "created_at": current_user.get("created_at"),
    }

    return {
        "status": "ok",
        "user": user_info
    }