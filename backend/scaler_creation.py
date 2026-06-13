import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib

df = pd.read_csv("csv_files/features_full.csv")

X = df.drop(columns=["label"])

scaler = StandardScaler()
scaler.fit(X)

joblib.dump(
    scaler,
    "models/xgboost_scaler_optimized.pkl"
)

print("Scaler recreated successfully")