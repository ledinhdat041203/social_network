from fastapi import FastAPI
import uvicorn
from routers import user_router, post_router 
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
# from fastapi_session import SessionMiddleware
# from fastapi_session.backends.client import ClientSessionBackend

app = FastAPI()
load_dotenv()
port = int(os.getenv("PORT"))
middleware_url = os.getenv("MIDDLEWARE_URL")


app.add_middleware(
    CORSMiddleware,
    allow_origins=middleware_url, 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(user_router.router, prefix="/user", tags=["user"])
app.include_router(post_router.router, prefix="/post", tags=["post"])

@app.get('/')
async def home():
    return "Home"

if __name__ == "__main__":
    
    uvicorn.run(app, host="localhost", port=port)
