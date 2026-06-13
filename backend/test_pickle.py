import pickle

with open("models/xgboost_scaler_optimized.pkl", "rb") as f:
    obj = pickle.load(f)

print(type(obj))