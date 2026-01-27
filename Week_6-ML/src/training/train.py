import os
import sys
import json
import joblib
import logging
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(current_dir))
sys.path.insert(0, project_root)

from src.features.build_features import (
    load_data,
    create_advanced_features,
    build_pipeline,
)
from src.features.feature_selector import correlation_filter, rfe_selection

from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    ConfusionMatrixDisplay,
)
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from xgboost import XGBClassifier

os.makedirs("src/models", exist_ok=True)
os.makedirs("src/evaluation", exist_ok=True)
os.makedirs("src/logs", exist_ok=True)

log_filename = f"src/logs/training_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler(log_filename), logging.StreamHandler(sys.stdout)],
)


def main():
    logging.info("Starting Training Pipeline...")

    df = load_data()
    df = create_advanced_features(df)

    X_train, X_test, y_train, y_test, _ = build_pipeline(df)

    leakage_cols = ["cibil_score", "high_cibil_flag"]
    logging.info(f"Removing data leakage columns: {leakage_cols}")
    X_train = X_train.drop(columns=leakage_cols, errors="ignore")
    X_test = X_test.drop(columns=leakage_cols, errors="ignore")

    logging.info("Running correlation filter...")
    drop_cols = correlation_filter(X_train, threshold=0.85)
    X_train = X_train.drop(columns=drop_cols)
    X_test = X_test.drop(columns=drop_cols)
    logging.info(f"Dropped {len(drop_cols)} features due to high correlation.")

    logging.info("Running RFE feature selection...")
    selected_features = rfe_selection(X_train, y_train, n_features=10)
    X_train = X_train[selected_features]
    X_test = X_test[selected_features]
    logging.info(f"Selected {len(selected_features)} features.")

    with open("src/features/feature_list.json", "w") as f:
        json.dump(selected_features, f, indent=4)

    models = {
        "Logistic Regression": LogisticRegression(
            class_weight="balanced", max_iter=2000, C=0.5
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=300, max_depth=12, class_weight="balanced", random_state=42
        ),
        "XGBoost": XGBClassifier(
            eval_metric="logloss",
            max_depth=6,
            learning_rate=0.03,
            scale_pos_weight=1.5,
            random_state=42,
        ),
        "Neural Network": MLPClassifier(
            hidden_layer_sizes=(64, 32), max_iter=1000, random_state=42
        ),
    }

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    results = {}
    best_auc = 0
    best_model = None
    best_model_name = ""

    logging.info("Starting model training...")

    for name, model in models.items():
        logging.info(f"Training {name}...")
        y_pred = cross_val_predict(model, X_train, y_train, cv=cv)

        try:
            y_proba = cross_val_predict(
                model, X_train, y_train, cv=cv, method="predict_proba"
            )[:, 1]
        except:
            y_proba = y_pred

        metrics = {
            "accuracy": accuracy_score(y_train, y_pred),
            "precision": precision_score(y_train, y_pred),
            "recall": recall_score(y_train, y_pred),
            "f1": f1_score(y_train, y_pred),
            "roc_auc": roc_auc_score(y_train, y_proba),
        }

        results[name] = metrics
        logging.info(f"{name} AUC: {metrics['roc_auc']:.4f}")

        if metrics["roc_auc"] > best_auc:
            best_auc = metrics["roc_auc"]
            best_model = model
            best_model_name = name

    with open("src/evaluation/metrics.json", "w") as f:
        json.dump(results, f, indent=4)

    logging.info(f"Retraining best model ({best_model_name}) on full dataset...")
    best_model.fit(X_train, y_train)
    joblib.dump(best_model, "src/models/best_model.pkl")

    y_test_pred = best_model.predict(X_test)
    cm = confusion_matrix(y_test, y_test_pred)

    disp = ConfusionMatrixDisplay(confusion_matrix=cm)
    disp.plot()
    plt.title(f"Confusion Matrix ({best_model_name})")
    plt.savefig("src/evaluation/confusion_matrix.png")

    logging.info("Confusion matrix saved.")
    logging.info("Day 3 Process Completed Successfully.")


if __name__ == "__main__":
    main()
