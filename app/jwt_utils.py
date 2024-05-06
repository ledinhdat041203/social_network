import jwt
from datetime import datetime, timedelta
from fastapi import Request
from fastapi.security import OAuth2PasswordBearer


SECRET_KEY = "58a126d5568b5f6009d4c73be8a269d22cf2d24bfd67b2674344c706f5984388"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(user_id: str, expires_delta: timedelta):
    to_encode = {"sub": user_id}
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_userid(request: Request):
    token = request.headers.get("Authorization")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        return user_id
    except Exception as e:
        return None
