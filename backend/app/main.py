from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.user_schema import CreateUser
from bson import ObjectId

# Importing Database
from app.mongodb.connect import connectdb

"""
App Created
"""
app = FastAPI()


"""
CORS
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, use specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



"""
Just basic APIs
"""
@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}



"""
All the APIS for AUTHENTICATION
"""

#----------------------------
# Create new student account
#----------------------------

@app.post("/signup")
def SignUp(user: CreateUser):
    try:
        db = connectdb()
        collection = db["signup"]

        new_user = {
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "is_varified": user.is_varified,
            "campus": user.campus,
            "phone": user.phone,
            "year": user.year,
        }

        result = collection.insert_one(new_user)

        # Convert ObjectId to string
        new_user["_id"] = str(result.inserted_id)

        return {
            "status": "ok",
            "user": new_user
        }
    except Exception as e:
        print("Error in signup :- ", e)


