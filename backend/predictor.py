import os

import joblib
import numpy as np
from feature_extractor import extract_features


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "xgboost_model_optimized.pkl"
)

SCALER_PATH = os.path.join(
    BASE_DIR,
    "models",
    "xgboost_scaler_optimized.pkl"
)

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

def predict_audio(audio_path):
    """
    Predict whether audio is real or fake.

    Returns:
        {
            prediction,
            confidence,
            real_probability
            fake_probability
        }
    """

    # Extract features
    features = extract_features(audio_path)

    # Reshape for sklearn
    features = features.reshape(1, -1)

    # Scale
    features_scaled = scaler.transform(features)

    # Predict class
    prediction = model.predict(features_scaled)[0]

    # Predict probabilities
    probabilities = model.predict_proba(
        features_scaled
    )[0]

    real_probability = round(float(probabilities[0]) * 100, 2)
    fake_probability = round(float(probabilities[1]) * 100, 2)

    confidence = float(
        np.max(probabilities) * 100
    )

    label = (
        "Fake"
        if prediction == 1
        else "Real"
    )

    return {
        "prediction": label,
        "confidence": round(confidence, 2),
        "real_probability": real_probability,
        "fake_probability": fake_probability,
    }