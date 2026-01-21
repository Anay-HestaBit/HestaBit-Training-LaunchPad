import pandas as pd
import numpy as np
import yaml
import logging
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

CONFIG_PATH = BASE_DIR / "src" / "config" / "config.yaml"

with open(CONFIG_PATH, "r") as file:
    config = yaml.safe_load(file)

RAW_DATA_PATH = BASE_DIR / config["paths"]["raw_data"]
PROCESSED_DATA_PATH = BASE_DIR / config["paths"]["processed_data"]

LOGS_DIR = BASE_DIR / "src" /  "logs"
LOGS_DIR.mkdir(exist_ok=True)

logging.basicConfig(
    filename=LOGS_DIR / "data_pipeline.log",
    level=logging.INFO,
    format="%(asctime)s - %(message)s"
)

logger = logging.getLogger()


def load_data(path):
    df = pd.read_csv(path)
    logger.info(f"LOAD DATA | rows = {len(df)}")
    return df


def remove_duplicates(df):
    before = len(df)

    df = df.drop_duplicates()
    df = df.drop_duplicates(subset="Transaction_ID", keep="first")

    after = len(df)
    logger.info(
        f"DUPLICATES | before = {before}, after = {after}, removed = {before - after}"
    )
    return df


def standardize_categories(df):
    before = len(df)

    gender_map = {
        "M": "Male",
        "Male": "Male",
        "F": "Female",
        "Female": "Female",
        "NB": "Non-Binary",
        "Non-Binary": "Non-Binary"
    }

    df["Gender"] = df["Gender"].map(gender_map)
    df["Payment_Method"] = df["Payment_Method"].str.strip().str.title()
    df["City"] = df["City"].str.strip().str.title()

    after = len(df)
    logger.info(f"CATEGORY STANDARDIZATION | before = {before}, after = {after}")
    return df


def handle_missing_values(df):
    rows = len(df)
    missing_before = df.isnull().sum().sum()

    for col in ["Gender", "City", "Payment_Method"]:
        if not df[col].mode().empty:
            df[col] = df[col].fillna(df[col].mode()[0])

    df["Customer_Rating"] = df["Customer_Rating"].fillna(
        df["Customer_Rating"].median()
    )

    missing_after = df.isnull().sum().sum()
    logger.info(
        f"MISSING VALUES | rows = {rows}, missing before = {missing_before}, missing after = {missing_after}"
    )
    return df


def cap_using_iqr(series):
    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1

    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR

    return series.clip(lower, upper)


def handle_outliers(df):
    before = len(df)

    median_age = df["Age"].median()
    df.loc[(df["Age"] < 0) | (df["Age"] > 100), "Age"] = median_age

    df = df[df["Unit_Price"] >= 0].copy()

    df["Unit_Price"] = cap_using_iqr(df["Unit_Price"])
    df["Quantity"] = cap_using_iqr(df["Quantity"])
    df["Total_Sales"] = cap_using_iqr(df["Total_Sales"])

    after = len(df)
    logger.info(
        f"OUTLIERS | before = {before}, after = {after}, removed = {before - after}"
    )
    return df


def clean_date(df):
    before = len(df)
    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    df = df.dropna(subset=["Date"])
    after = len(df)
    logger.info(
        f"DATE CLEANING | before = {before}, after = {after}, removed = {before - after}"
    )
    return df



def save_data(df, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(path, index=False, mode="w")
    logger.info(f"SAVE DATA | final rows = {len(df)} | path = {path}")


def main():
    logger.info("DATA PIPELINE STARTED")

    df = load_data(RAW_DATA_PATH)
    df = remove_duplicates(df)
    df = standardize_categories(df)
    df = handle_missing_values(df)
    df = handle_outliers(df)
    df = clean_date(df)
    save_data(df, PROCESSED_DATA_PATH)

    logger.info("DATA PIPELINE COMPLETED")
    
if __name__ == "__main__":
    main()
