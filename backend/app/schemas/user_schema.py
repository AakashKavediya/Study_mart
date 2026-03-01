from pydantic import BaseModel, EmailStr, Field

class CreateUser(BaseModel):
    name: str = Field(min_length=5, max_length=50)
    email: EmailStr = Field(min_length=10, max_length=50)
    password: str = Field(min_length=3, max_length=18)
    is_varified: bool
    campus: str
    phone: int = Field(..., ge=1000000000, le=9999999999)
    year: str

