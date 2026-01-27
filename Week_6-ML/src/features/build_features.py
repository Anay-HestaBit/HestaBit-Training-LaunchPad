import pandas as pd
import numpy as np
import os
import sys
import logging
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer

os.makedirs("src/logs", exist_ok=True)
log_filename = (
    f"src/logs/feature_engineering_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler(log_filename), logging.StreamHandler(sys.stdout)],
)

DATA_PATH = "src/data/raw/data.csv"
OUTPUT_PATH = "src/data/processed/"


def load_data():
    logging.info(f"Loading data from {DATA_PATH}...")
    if not os.path.exists(DATA_PATH):
        logging.error(f"File not found: {DATA_PATH}")
        raise FileNotFoundError(f"File not found at {DATA_PATH}")

    df = pd.read_csv(DATA_PATH)
    df.columns = df.columns.str.strip()
    df["loan_status"] = df["loan_status"].str.strip()
    df = df.drop(columns=["loan_id"])

    logging.info(f"Data loaded. Shape: {df.shape}")
    return df


def create_advanced_features(df):
    logging.info("Generating advanced financial features...")

    df["total_assets"] = (
        df["residential_assets_value"]
        + df["commercial_assets_value"]
        + df["luxury_assets_value"]
        + df["bank_asset_value"]
    )
    df["loan_coverage_ratio"] = df["total_assets"] / (df["loan_amount"] + 1)
    df["loan_to_income"] = df["loan_amount"] / (df["income_annum"] + 1)
    df["liquid_assets"] = df["commercial_assets_value"] + df["bank_asset_value"]
    df["liquidity_ratio"] = df["liquid_assets"] / (df["loan_amount"] + 1)
    df["log_income"] = np.log1p(df["income_annum"])
    df["log_loan"] = np.log1p(df["loan_amount"])

    logging.info("Feature engineering complete.")
    return df


def build_pipeline(df):
    logging.info("Starting preprocessing pipeline...")

    df["loan_status"] = df["loan_status"].map({"Approved": 1, "Rejected": 0})
    y = df["loan_status"]
    X = df.drop(columns=["loan_status"])

    edu_encoder = LabelEncoder()
    X["education"] = edu_encoder.fit_transform(X["education"])

    categorical_cols = ["self_employed"]
    numerical_cols = [col for col in X.columns if col not in categorical_cols]

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numerical_cols),
            ("cat", OneHotEncoder(drop="first"), categorical_cols),
        ]
    )

    logging.info("Splitting data into train/test sets...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    logging.info("Applying scaling and encoding...")
    X_train_scaled = preprocessor.fit_transform(X_train)
    X_test_scaled = preprocessor.transform(X_test)

    feature_names = numerical_cols + list(
        preprocessor.named_transformers_["cat"].get_feature_names_out(categorical_cols)
    )

    X_train_df = pd.DataFrame(X_train_scaled, columns=feature_names)
    X_test_df = pd.DataFrame(X_test_scaled, columns=feature_names)

    logging.info(f"Preprocessing finished. Training shape: {X_train_df.shape}")
    return X_train_df, X_test_df, y_train, y_test, feature_names


def save_outputs(X_train, X_test, y_train, y_test):
    logging.info(f"Saving processed files to {OUTPUT_PATH}...")
    os.makedirs(OUTPUT_PATH, exist_ok=True)

    X_train.to_csv(os.path.join(OUTPUT_PATH, "X_train.csv"), index=False)
    X_test.to_csv(os.path.join(OUTPUT_PATH, "X_test.csv"), index=False)
    y_train.to_csv(os.path.join(OUTPUT_PATH, "y_train.csv"), index=False)
    y_test.to_csv(os.path.join(OUTPUT_PATH, "y_test.csv"), index=False)

    logging.info("Files saved successfully.")

if __name__ == "__main__":
    df = load_data()
    df = create_advanced_features(df)
    X_train, X_test, y_train, y_test, features = build_pipeline(df)
    save_outputs(X_train, X_test, y_train, y_test)
