from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel, EmailStr, field_validator, Field, HttpUrl
from datetime import datetime
from typing import List

"""
Information required:
1.  "_id": ObjectId,
2.  "name": "Aakash",
3.  "email": "aakash@college.edu",
4.  "year": "2nd",
5.  "phone": "9619688218",
6.  "password_hash": "hashed",
7.  "profile_image": "url",
8.  "bio": "Frontend developer & AI enthusiast",
9.  "skills": ["React", "Python", "ML"],
10. "rating": 4.7,
11. "total_reviews": 12,
12. "products_sold_count": 8,
13. "active_listings_count": 3,
14. "is_verified": true,
15. "is_blocked": false,
16. "created_at": datetime,
17. "updated_at": datetime,
18. "last_active": datetime

"""
#----------------------------
# USER PROFILE SCHEMA
#----------------------------

class UserProfilePublic(BaseModel):
    id: str = Field(..., alias="_id")

    name: str = Field(min_length=2, max_length=50)
    email: EmailStr

    profile_image: HttpUrl | None = None
    bio: str | None = Field(default=None, max_length=500)

    skills: List[str] = Field(default_factory=list, max_length=20)

    rating: float = Field(ge=0, le=5)
    total_reviews: int = Field(ge=0)

    products_sold_count: int = Field(ge=0)
    active_listings_count: int = Field(ge=0)

    is_verified: bool

    created_at: datetime
    last_active: datetime

    class Config:
        populate_by_name = True