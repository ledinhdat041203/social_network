from pydantic import BaseModel
from datetime import datetime


class Post(BaseModel):
    id: str = None
    text: str = ""
    imageURL: str = ""
    time: str = str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    likesCount: int = 0

   