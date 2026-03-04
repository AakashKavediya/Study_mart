#importing dependencies
from fastapi import FastAPI, Depends, status, Query
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
from app.schemas.profile_schema import UserProfilePublic, UpdateProfile

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
profile_collection = db["user-profile"]



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
    from datetime import datetime

    email = user.email.lower()

    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match"
        )

    existing_user = await run_in_threadpool(
        signup_collection.find_one,
        {"$or": [{"email": email}, {"phone": user.phone}]}
    )

    if existing_user:
        if existing_user["email"] == email:
            raise HTTPException(409, "Email already registered")
        else:
            raise HTTPException(409, "Phone already registered")

    hashed_pw = await run_in_threadpool(
        bcrypt.hashpw, user.password.encode(), bcrypt.gensalt(rounds=10)
    )

    new_user = {
        "name": user.name,
        "email": email,
        "password": hashed_pw,
        "campus": user.campus,
        "phone": user.phone,
        "year": user.year,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

    try:
        result = await run_in_threadpool(signup_collection.insert_one, new_user)

        profile = {
            "_id": result.inserted_id,
            "name": user.name,
            "email": email,
            "campus": user.campus,
            "phone": user.phone,
            "year": user.year,
            "created_at": datetime.utcnow(),
        }

        profile_result = await run_in_threadpool(
            profile_collection.insert_one,
            profile
        )

        return {
            "status": "ok",
            "user_id": str(result.inserted_id),
            "profile_id": str(profile_result.inserted_id)
        }

    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
            detail="Email or phone already registered"
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


"""
USER PROFILE APIs

| Method | Endpoint                 | Purpose               |
| ------ | ------------------------ | --------------------- |
| GET    | `/users/{user_id}`       | View public profile   | Done
| PUT    | `/users/profile`         | Update own profile    | Done
| POST   | `/users/profile/image`   | Upload profile image  | #Done
| GET    | `/users/my-products`     | Get my listings       |
| GET    | `/users/my-lost-posts`   | My lost & found posts |
| POST   | `/users/block/{user_id}` | Block user            |
| GET    | `/users/search`          | Search users          |

"""


#----------------------------
# API FOR SEARCH USER
#----------------------------

@app.get("/users/search")
async def search_user(name: str):
    profiles = await run_in_threadpool(
        lambda: list(
            profile_collection.find(
                {"name": {"$regex": name, "$options": "i"}}
            ).limit(20)
        )
    )

    for p in profiles:
        p["_id"] = str(p["_id"])

    return {
        "status": "ok",
        "results": profiles
    }




#----------------------------
# API FOR VIEW PUBIC PROFILE
#----------------------------

@app.get("/users/{user_id}")
async def get_public_profile(user_id: str):

    user = await run_in_threadpool(
        profile_collection.find_one,
        {"_id": ObjectId(user_id)}
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user["_id"] = str(user["_id"])

    return user




#----------------------------
# API FOR COMPLETE PROFILE LIST
#----------------------------
"""
NOT WORKING PROPERLY
INTERNAL SERVER ERROR

"""

@app.get("/users/profile_list")
async def get_profile_list():

    profiles = await run_in_threadpool(
        lambda: list(
            profile_collection.find({}, {"name": 1})
        )
    )

    result = []

    for p in profiles:
        result.append({
            "id": str(p["_id"]),
            "name": p.get("name")
        })

    return {"status": "ok", "profiles": result}



#----------------------------
# API FOR UPDATE OWN PROFILE
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

    user = await run_in_threadpool(
        profile_collection.find_one,
        {"_id": ObjectId(user_id)}
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user

@app.put("/users/profile", status_code=status.HTTP_200_OK)
async def update_my_profile(
    profile: UpdateProfile,
    current_user=Depends(get_current_user)
):

    user_id = current_user["_id"]

    update_data = profile.dict(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields provided to update"
        )

    update_data["updated_at"] = datetime.utcnow()

    result = await run_in_threadpool(
        profile_collection.update_one,
        {"_id": user_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    updated_user = await run_in_threadpool(
        profile_collection.find_one,
        {"_id": user_id}
    )

    updated_user["_id"] = str(updated_user["_id"])

    return {
        "status": "ok",
        "user": updated_user
    }



#----------------------------
# API FOR UPLOAD PROFILE IMAGE
#----------------------------

#DONE







"""
PRODUCT (MARKETPLACE) APIs

Core Product Management

| Method | Endpoint                           | Purpose                            |
| ------ | ---------------------------------- | ---------------------------------- |
| POST   | `/products`                        | Create product                     |
| GET    | `/products`                        | Get all products (with pagination) |
| GET    | `/products/{product_id}`           | Get single product                 |
| PUT    | `/products/{product_id}`           | Edit product                       |
| DELETE | `/products/{product_id}`           | Delete product                     |
| PATCH  | `/products/{product_id}/mark-sold` | Mark product sold                  |

"""






"""
PRODUCT (MARKETPLACE) APIs

Product Filtering & Search

| Method | Endpoint                        | Purpose            |
| ------ | ------------------------------- | ------------------ |
| GET    | `/products/search`              | Search products    |
| GET    | `/products/category/{category}` | Filter by category |
| GET    | `/products/user/{user_id}`      | Products by seller |

"""





"""
PRODUCT (MARKETPLACE) APIs

Engagement

| Method | Endpoint                      | Purpose             |
| ------ | ----------------------------- | ------------------- |
| POST   | `/products/{product_id}/view` | Increase view count |
| POST   | `/products/{product_id}/like` | Like product        |
| DELETE | `/products/{product_id}/like` | Remove like         |

"""







"""
IMAGE UPLOAD APIs

| Method | Endpoint                | Purpose                |
| ------ | ----------------------- | ---------------------- |
| POST   | `/upload/product-image` | Upload product images  |
| POST   | `/upload/profile-image` | Upload profile image   |
| POST   | `/upload/lost-image`    | Upload lost item image |
| POST   | `/upload/event-image`   | Upload event image     |

"""







"""
CHAT APIs (Real-Time System)

REST Endpoints

| Method | Endpoint                   | Purpose       |
| ------ | -------------------------- | ------------- |
| POST   | `/chat/start/{product_id}` | Start chat    |
| GET    | `/chat/my-chats`           | Get all chats |
| GET    | `/chat/{chat_id}`          | Get messages  |
| DELETE | `/chat/{chat_id}`          | Delete chat   |


WebSocket Endpoint

| Method | Endpoint             | Purpose             |
| ------ | -------------------- | ------------------- |
| WS     | `/ws/chat/{chat_id}` | Real-time messaging |

"""







"""
NOTIFICATION APIs

| Method | Endpoint                   | Purpose             |
| ------ | -------------------------- | ------------------- |
| GET    | `/notifications`           | Get notifications   |
| PATCH  | `/notifications/{id}/read` | Mark as read        |
| DELETE | `/notifications/{id}`      | Delete notification |

"""







"""
LOST & FOUND APIs

Lost Items

| Method | Endpoint          | Purpose                |
| ------ | ----------------- | ---------------------- |
| POST   | `/lost`           | Create lost/found post |
| GET    | `/lost`           | Get all lost posts     |
| GET    | `/lost/{lost_id}` | Get single post        |
| PUT    | `/lost/{lost_id}` | Update lost post       |
| DELETE | `/lost/{lost_id}` | Delete post            |

"""








"""
LOST & FOUND APIs

Lost Item Comments

| Method | Endpoint                     | Purpose        |
| ------ | ---------------------------- | -------------- |
| POST   | `/lost/{lost_id}/comment`    | Add comment    |
| GET    | `/lost/{lost_id}/comments`   | Get comments   |
| DELETE | `/lost/comment/{comment_id}` | Delete comment |

"""







"""
LOST & FOUND APIs

Claim System

| Method | Endpoint                  | Purpose       |
| ------ | ------------------------- | ------------- |
| POST   | `/lost/{lost_id}/claim`   | Claim item    |
| PATCH  | `/lost/{lost_id}/resolve` | Mark resolved |

"""







"""
ADMIN APIs

| Method | Endpoint                  | Purpose             |
| ------ | ------------------------- | ------------------- |
| GET    | `/admin/users`            | View all users      |
| PATCH  | `/admin/users/{id}/block` | Block user          |
| GET    | `/admin/products`         | View all products   |
| DELETE | `/admin/products/{id}`    | Remove product      |
| GET    | `/admin/lost`             | Moderate lost posts |
| DELETE | `/admin/events/{id}`      | Remove event        |
| GET    | `/admin/reports`          | View abuse reports  |

"""