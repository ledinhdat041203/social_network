from fastapi import APIRouter, HTTPException, Depends, Request
from models.user import User
from models.post import Post
from services.jwt_utils import get_current_userid
from services import post_service
from pydantic import BaseModel

class Comment(BaseModel):
    content: str = ""
    

router = APIRouter()

@router.post('/create-post')
async def create_post(post_data: Post, current_userid: str = Depends(get_current_userid)):
    # Kiểm tra xem người dùng đã đăng nhập chưa
    print(post_data)
    if not current_userid:
        return {"message": "User not authenticated", "status": 401}

    if post_service.create_post(post_data, current_userid):
        return {"message": "Post created successfully", "status": 200}
    else:
         return {"message": "Failed to create post", "status": 401}
    
@router.post('/like/{post_id}')
async def like_post(post_id: str, current_userid: str = Depends(get_current_userid)):
    if (post_service.exists_like(current_userid, post_id)):
        if (post_service.quit_like(current_userid,post_id)):
            return {"message": "quit like successfully", "status": 200}
        else:
            return {"message": "Failed to quit like post", "status": 400}
    else:
        if (post_service.like_post(current_userid,post_id)):
            return {"message": "Post liked successfully", "status": 200}
        else:
            return {"message": "Failed to like post", "status": 400}
        
@router.get("/newsfeed/{page}")
async def findAllPostPage(page: int, current_userid: str = Depends(get_current_userid)):
    page_int = int(page)
    data = post_service.findAllPostPage(page_int, current_userid)
    if (data):
        return {"message": "successfully", "data": data, "status": 200}
    else:
        return {"message": "Failed", "status": 400}
@router.get("/findPostFollowing/{page}")
async def findPostFollowing(page: int, current_userid: str = Depends(get_current_userid)):
    page_int = int(page)
    data = post_service.findPostFollowing(page_int, current_userid)
    if (data):
        return {"message": "successfully", "data": data, "status": 200}
    else:
        return {"message": "Failed", "status": 400}

@router.post("/create_comment/{post_id}")
async def createComment(post_id: str, data: Comment, current_userid: str = Depends(get_current_userid)):
    data = post_service.createComment(post_id, data, current_userid)
    if data:
        return {"message": "comment created successfully", "data": data, "status": 200}
    else:
         return {"message": "Failed to create comment", "status": 400}

@router.get("/loadcomments/{postid}")
async def findAllcmt(postid: str):
    data = post_service.findAllCmt(postid=postid)
    if (data):
        return {"message": "successfully", "data": data, "status": 200}
    else:
        return {"message": "Failed", "status": 400}


@router.get("/findsavepost/{page}")
async def findSavePost(page: int, current_userid: str = Depends(get_current_userid)):
    page_int = int(page)
    data = post_service.findSavePost(page_int, current_userid)
    if (data):
        return {"message": "successfully", "data": data, "status": 200}
    else:
        return {"message": "Failed", "status": 400}
    
@router.get("/findmypost/{page}")
async def findSavePost(page: int, current_userid: str = Depends(get_current_userid)):
    page_int = int(page)
    data = post_service.findMyPost(page_int, current_userid)
    if (data):
        return {"message": "successfully", "data": data, "status": 200}
    else:
        return {"message": "Failed", "status": 400}
