# Model Comparison Report

## 1. Summary of Results

We trained four models on the loan dataset after removing data leakage (CIBIL score). The goal was to predict loan approval using only financial ratios (Income, Assets, etc.).

| Model                   |  Accuracy  | Precision  |   Recall   |  F1 Score  |  ROC-AUC   |
| :---------------------- | :--------: | :--------: | :--------: | :--------: | :--------: |
| **XGBoost**             | **0.6228** |   0.6262   | **0.9774** | **0.7633** | **0.5752** |
| **Random Forest**       |   0.5523   |   0.6411   |   0.6372   |   0.6391   |   0.5731   |
| **Logistic Regression** |   0.5417   | **0.6602** |   0.5431   |   0.5959   |   0.5728   |
| **Neural Network**      |   0.5575   |   0.6387   |   0.6654   |   0.6518   |   0.5553   |

## 2. Best Model Selected

** Winner: XGBoost**

- **Why?** It achieved the highest **F1 Score (0.76)** and **Accuracy (62%)**.
- **Behavior:** It has a very high Recall (98%), meaning it correctly identifies almost all approved loans, though it tends to be aggressive in its approvals.
- **Next Steps:** This model will be used for Hyperparameter Tuning in Day 4 to improve its ability to distinguish rejections better.
