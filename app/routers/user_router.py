from fastapi import APIRouter, HTTPException, Depends, Request
from models.user import User
from services import user_service
from datetime import  timedelta
from services.jwt_utils import create_access_token, get_current_userid


router = APIRouter()

@router.post('/login')
async def login(data: User):
    email = data.email
    password = data.password
    print(email, password)
    
    if user_service.login(email, password):
        print('ok')
        id = user_service.findIDByEmail(email)
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token({"id": id}, access_token_expires)
        print(access_token)
        return {"message": "Login successful!", "access_token": access_token, "status": 200}
    else:
        return {"message": "user invalid", "status": 400}

@router.post('/register')
async def register(data: User):
    fullname = data.fullname
    gender = data.gender
    phone = data.phone
    city = data.city
    country = data.country
    profileImageUrl = data.profileImageUrl
    birthday = data.birthday

    email = data.email
    password = data.password

    print(data)

    if user_service.existsEmail(email):
        return {"message": "Email is exists", "status": 400}
    elif user_service.register(data):
        return {"message": "Register successful!", "status": 200}        
    else:
        return {"message": "Register fail", "status": 400}
    
@router.post('/follow/{userid}')
async def register(userid: str, current_userid: str = Depends(get_current_userid)):
    if (user_service.exists_follow(current_userid, userid)):
        if (user_service.unfollow(current_userid, userid)):
            return {"message": "unfollow successfully", "status": 200}
        else:
            return {"message": "Failed to unfollow", "status": 400}
    else:
        if (user_service.follow(current_userid, userid)):
            return {"message": "follow successfully", "status": 200}
        else:
            return {"message": "Failed to follow", "status": 400}
        
@router.get('/getinfouser')
async def get_info_user(current_userid: str = Depends(get_current_userid)):
    info = user_service.get_info_user(current_userid)
    if (info):
        return {"message": "successfully", "data": info, "status": 200}
    else:
        return {"message": "Failed", "status": 400}

@router.get('/suggestion')
async def suggestionUser(current_userid: str = Depends(get_current_userid)):
    data = user_service.suggestionUser(current_userid)
    if (data):
        return {"message": "successfully", "data": data, "status": 200}
    else:
        return {"message": "Failed", "status": 400}

@router.post("/savepost/{postid}")
async def savepost(postid: str, current_userid: str = Depends(get_current_userid)):
    if (user_service.savepost(current_userid,postid)):
        return {"message": "successfully", "status": 200}
    else:
        return {"message": "Failed", "status": 400}
    
@router.get("/profile/{userid}")
async def profile(userid: str):
    data = user_service.profile(userid=userid)
    if (data):
        return {"message": "successfully", "data": data, "status": 200}
    else:
        return {"message": "Failed", "status": 400}








