import os

from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from fastapi.middleware.cors import CORSMiddleware

from predictor import predict_audio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://deepfake-audio-detector-ten.vercel.app/"],  # Next.js dev URL
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@app.get("/")
def root():
    return {
        "status": "running"
    }


@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        content = await file.read()

        buffer.write(content)

    result = predict_audio(
        file_path
    )

    return result