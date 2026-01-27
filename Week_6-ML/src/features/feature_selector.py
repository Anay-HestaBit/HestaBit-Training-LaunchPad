import pandas as pd
from sklearn.feature_selection import mutual_info_classif
from sklearn.linear_model import LogisticRegression
from sklearn.feature_selection import RFE
import matplotlib.pyplot as plt

DATA_PATH_TRAIN = "src/data/processed/train/"
DATA_PATH_TEST = "src/data/processed/test/"
FEATURE_PATH = "src/features/"


def load_data():
    X_train = pd.read_csv(DATA_PATH_TRAIN + "X_train.csv")
    X_test = pd.read_csv(DATA_PATH_TEST + "X_test.csv")
    y_train = pd.read_csv(DATA_PATH_TRAIN + "y_train.csv").values.ravel()
    y_test = pd.read_csv(DATA_PATH_TEST + "y_test.csv").values.ravel()
    return X_train, X_test, y_train, y_test


def correlation_filter(X, threshold=0.9):
    corr = X.corr().abs()
    drop_cols = []

    for i in range(len(corr.columns)):
        for j in range(i):
            if corr.iloc[i, j] > threshold:
                drop_cols.append(corr.columns[i])
                break

    return drop_cols


def mutual_info_selection(X, y, top_k=15):
    scores = mutual_info_classif(X, y, random_state=42)

    mi_df = pd.DataFrame({
        "feature": X.columns,
        "score": scores
    }).sort_values(by="score", ascending=False)

    selected = mi_df.head(top_k)["feature"].tolist()
    return selected, mi_df


def rfe_selection(X, y, n_features=10):
    model = LogisticRegression(max_iter=1000)
    rfe = RFE(model, n_features_to_select=n_features)
    rfe.fit(X, y)
    return X.columns[rfe.support_].tolist()


if __name__ == "__main__":
    X_train, X_test, y_train, y_test = load_data()

    drop_cols = correlation_filter(X_train)
    X_train = X_train.drop(columns=drop_cols)
    X_test = X_test.drop(columns=drop_cols)

    selected_mi, mi_scores = mutual_info_selection(X_train, y_train)
    X_train = X_train[selected_mi]
    X_test = X_test[selected_mi]

    final_features = rfe_selection(X_train, y_train)

    X_train_final = X_train[final_features]
    X_test_final = X_test[final_features]

    X_train_final.to_csv(DATA_PATH_TRAIN + "X_train_selected.csv", index=False)
    X_test_final.to_csv(DATA_PATH_TEST + "X_test_selected.csv", index=False)

    feature_info = {
        "total_features_after_engineering": X_train.shape[1],
        "features_removed_by_correlation": len(drop_cols),
        "features_selected_by_mutual_info": len(selected_mi),
        "final_selected_features": len(final_features),
        "feature_names": final_features
    }

    pd.Series(feature_info).to_json(FEATURE_PATH + "feature_list.json")

    plt.figure(figsize=(10, 5))
    mi_scores.plot(x="feature", y="score", kind="bar")
    plt.title("Feature Importance (Mutual Information)")
    plt.tight_layout()
    plt.savefig(FEATURE_PATH + "feature_importance.png")
    plt.show()
