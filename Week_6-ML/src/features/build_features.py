import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer

DATA_PATH = "src/data/raw/data.csv"
OUTPUT_PATH = "src/data/processed/"


def load_data():
    df = pd.read_csv(DATA_PATH)
    df.columns = df.columns.str.strip()
    df["loan_status"] = df["loan_status"].str.strip()
    df = df.drop(columns=["loan_id"])
    return df


def create_features(df):
    df["total_assets"] = (
        df["residential_assets_value"]
        + df["commercial_assets_value"]
        + df["luxury_assets_value"]
        + df["bank_asset_value"]
    )

    df["log_income"] = np.log1p(df["income_annum"])
    df["log_loan_amount"] = np.log1p(df["loan_amount"])

    df["loan_to_income_ratio"] = df["loan_amount"] / (df["income_annum"] + 1)
    df["loan_to_assets_ratio"] = df["loan_amount"] / (df["total_assets"] + 1)

    df["high_income_flag"] = (df["income_annum"] > df["income_annum"].median()).astype(
        int
    )
    df["high_cibil_flag"] = (df["cibil_score"] >= 750).astype(int)
    df["assets_to_income_ratio"] = df["total_assets"] / (df["income_annum"] + 1)
    df["loan_per_year"] = df["loan_amount"] / (df["loan_term"] + 1)
    df["dependents_flag"] = (df["no_of_dependents"] > 0).astype(int)

    return df


def build_pipeline(df):
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

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    X_train_scaled = preprocessor.fit_transform(X_train)
    X_test_scaled = preprocessor.transform(X_test)
    feature_names = numerical_cols + list(
        preprocessor.named_transformers_["cat"].get_feature_names_out(categorical_cols)
    )

    X_train_scaled = pd.DataFrame(X_train_scaled, columns=feature_names)
    X_test_scaled = pd.DataFrame(X_test_scaled, columns=feature_names)

    return X_train_scaled, X_test_scaled, y_train, y_test


def save_outputs(X_train, X_test, y_train, y_test):
    pd.DataFrame(X_train).to_csv(OUTPUT_PATH + "X_train.csv", index=False)
    pd.DataFrame(X_test).to_csv(OUTPUT_PATH + "X_test.csv", index=False)
    y_train.to_csv(OUTPUT_PATH + "y_train.csv", index=False)
    y_test.to_csv(OUTPUT_PATH + "y_test.csv", index=False)


if __name__ == "__main__":
    df = load_data()
    df = create_features(df)
    X_train, X_test, y_train, y_test = build_pipeline(df)
    save_outputs(X_train, X_test, y_train, y_test)
