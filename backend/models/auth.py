from pydantic import BaseModel
from datetime import datetime

class UserAuth(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    created_at: datetime