# test_model.py

import joblib

model = joblib.load(
    "models/xgboost_model_optimized.pkl"
)

print("MODEL LOADED")