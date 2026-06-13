import joblib

scaler = joblib.load(
    "models/xgboost_scaler_optimized.pkl"
)

print("SCALER LOADED")