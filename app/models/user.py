from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id: str = None
    fullname: str = None
    email: str = None
    password: str = None
    birthday: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    profileImageUrl: Optional[str] = None

    