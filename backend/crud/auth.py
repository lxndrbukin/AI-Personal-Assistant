from fastapi import HTTPException
from db_models.auth import User
from models.auth import UserAuth, UserResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])

def register(data: UserAuth, db: Session):
    try:
        user = User(
            username=data.username,
            hash_password = pwd_context.hash(data.password)
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return UserResponse(id=user.id, username=user.username, created_at=user.created_at)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Username already exists")

def login(data: UserAuth, db: Session):
    user = db.query(User).filter(User.username == data.username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    is_valid = pwd_context.verify(data.password, user.hash_password)
    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return UserResponse(id=user.id, username=user.username, created_at=user.created_at)