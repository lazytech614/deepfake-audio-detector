# 🎙️ Deepfake Audio Detection System

A machine learning-powered application that detects whether an audio recording is **Real** or **AI-Generated (Deepfake)** using audio signal processing and XGBoost classification.

---

# 📖 Table of Contents

* Overview
* Features
* Tech Stack
* Project Architecture
* Project Structure
* Dataset
* Model Performance
* Setup & Installation
* Running the Application
* API Endpoints
* Future Improvements
* Author

---

# 🚀 Overview

Deepfake audio technologies have become increasingly sophisticated, making it difficult to distinguish between authentic and synthetic speech.

This project analyzes speech recordings and classifies them as:

* ✅ Real Human Voice
* ❌ AI Generated / Deepfake Voice

The system extracts handcrafted audio features and uses an optimized XGBoost model for prediction.

---

# ✨ Features

* Upload WAV audio files
* Deepfake speech detection
* Confidence score generation
* FastAPI REST API
* Swagger API documentation
* XGBoost-based classification
* Feature engineering pipeline
* Ready for frontend integration

---

# 🛠️ Tech Stack

## Machine Learning

* Python
* NumPy
* Pandas
* Scikit-Learn
* XGBoost
* Librosa
* Joblib

## Backend

* FastAPI
* Uvicorn

## Frontend 

* Next.js
* TypeScript
* Tailwind CSS

## Deployment

* Render
* Vercel

---

# 🏗️ Architecture

```text
Audio File
    │
    ▼
Feature Extraction
    │
    ├── MFCC
    ├── Chroma
    ├── Spectral Centroid
    ├── Spectral Bandwidth
    └── Zero Crossing Rate
    │
    ▼
Feature Scaling
    │
    ▼
XGBoost Classifier
    │
    ▼
Prediction
    │
    ▼
Real / Fake
```

---

# 📂 Project Structure

```text
deepfake-audio-detector/
│
├── backend/
│   │
│   ├── app.py
│   ├── predictor.py
│   ├── feature_extractor.py
│   │
│   ├── models/
│   │   └── deepfake_detector_bundle.pkl
│   │
│   ├── uploads/
│   │
│   └── requirements.txt
│
├── frontend/
│
└── README.md
```

---

# 🎵 Dataset

Dataset consists of:

```text
TRAIN
Real: 6978
Fake: 6978

VALIDATION
Real: 1413
Fake: 1413

TEST
Real: 544
Fake: 544
```

Audio Specifications:

```text
Sample Rate: 16000 Hz
Duration: 2 Seconds
```

---

# 📊 Feature Engineering

The following features are extracted:

### MFCC

```text
13 Features
```

### Chroma Features

```text
12 Features
```

### Zero Crossing Rate

```text
1 Feature
```

### Spectral Centroid

```text
1 Feature
```

### Spectral Bandwidth

```text
1 Feature
```

### Statistical Aggregations

Mean and Standard Deviation statistics are computed.

Total Feature Vector:

```text
44 Features
```

---

# 🤖 Model Performance

## Random Forest

```text
Accuracy: 96.91%
F1 Score: 97%
Confusion matrix: [[1345   51]
                  [ 35  1361]]
Equal Error Rate: 3.1%
```

---

## XGBoost

```text
Accuracy: 97.826%
F1 Score: 98%
Confusion matrix: [[1355   41]
                  [ 20  1376]]
Equal Error Rate: 1.79%
```
## XGBoost Optimized

```text
Accuracy: 98.28%
F1 Score: 98%
Confusion matrix: [[1364   32]
                  [ 16  1380]]
Equal Error Rate: 1.79%
```

### Cross Validation

```text
Mean Accuracy: 98.51%
Std Deviation: 0.19%
```

---

# ⚙️ Setup & Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/deepfake-audio-detector.git

cd deepfake-audio-detector
```

---

## 2. Create Virtual Environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / Mac

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## 3. Install Dependencies

Navigate to backend:

```bash
cd backend
```

Install packages:

```bash
pip install fastapi
pip install uvicorn
pip install numpy
pip install pandas
pip install scikit-learn
pip install xgboost
pip install librosa
pip install joblib
pip install python-multipart
```

Or:

```bash
pip install -r requirements.txt
```

---

## 4. Add Model Files

Place the trained model bundle inside:

```text
backend/models/
```

Expected structure:

```text
backend/
│
├── models/
│   └── deepfake_detector_bundle.pkl
```

---

## 5. Verify Backend Structure

```text
backend/
│
├── app.py
├── predictor.py
├── feature_extractor.py
│
├── models/
│   └── deepfake_detector_bundle.pkl
│
└── uploads/
```

---

## 6. Run Backend Server

Inside backend folder:

```bash
uvicorn app:app --reload
```

Expected output:

```text
INFO: Uvicorn running on http://127.0.0.1:8000
```

---

## 7. Open Swagger Documentation

Visit:

```text
http://127.0.0.1:8000/docs
```

Swagger UI allows testing the API directly from the browser.

##### *If your frontend is running on a port other than 3000, then update the CORS origins in the app.py file in backend folder*

---

## 8. Test Audio Prediction

1. Open Swagger UI
2. Expand:

```text
POST /predict
```

3. Click:

```text
Try it out
```

4. Upload a WAV file

Example Response:

```json
{
  "prediction": "Fake",
  "confidence": 99.72
}
```

---

# 📡 API Endpoints

## Health Check

### Request

```http
GET /
```

### Response

```json
{
  "status": "running"
}
```

---

## Predict Audio

### Request

```http
POST /predict
```

### Input

```text
audio.wav
```

### Response

```json
{
  "prediction": "Real",
  "confidence": 98.42
}
```

---

# 🚀 Future Improvements

* CNN-based Audio Classification
* Transformer Models
* Real-time Microphone Input
* Audio Waveform Visualization
* User Dashboard
* Prediction History
* Batch File Processing
* Explainable AI Features

---

# 👨‍💻 Author

**Rupanjan De**

Machine Learning & Full Stack Developer

---
