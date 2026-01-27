import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.feature_selection import mutual_info_classif, RFE
from sklearn.linear_model import LogisticRegression

def correlation_filter(X, threshold=0.85):
    corr_matrix = X.corr().abs()
    upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
    to_drop = [column for column in upper.columns if any(upper[column] > threshold)]
    return to_drop

def mutual_info_selection(X, y):
    scores = mutual_info_classif(X, y, random_state=42)
    mi_df = pd.DataFrame({
        "feature": X.columns,
        "score": scores
    }).sort_values(by="score", ascending=False)
    return mi_df

def rfe_selection(X, y, n_features=15):
    model = LogisticRegression(max_iter=2000, class_weight='balanced', random_state=42)
    rfe = RFE(estimator=model, n_features_to_select=n_features)
    rfe.fit(X, y)
    selected_features = X.columns[rfe.support_].tolist()
    return selected_features