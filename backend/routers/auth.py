from fastapi import APIRouter, status, Depends
from models.auth import UserAuth
from db import get_db
from sqlalchemy.orm import Session
from crud.auth import (
    register as register_crud,
    login as login_crud
)

auth_router = APIRouter(prefix="/auth")

@auth_router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: UserAuth, db: Session = Depends(get_db)):
    return register_crud(data, db)

@auth_router.post("/login", status_code=status.HTTP_200_OK)
def login(data: UserAuth, db: Session = Depends(get_db)):
    return login_crud(data, db)