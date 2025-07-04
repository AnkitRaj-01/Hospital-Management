from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.hospital_management import router
from dotenv import load_dotenv
import uvicorn

load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, tags=['HOSPITAL MANAGEMENT'])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)