# Model Comparison — Week 6 · Day 3

## Models Trained

- Logistic Regression
- Random Forest
- XGBoost
- Neural Network (MLP)

All models were trained using:

- Selected features from Day 2
- 5-fold Stratified Cross-Validation

## Evaluation Metrics

Reported metrics:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC

Primary metric for model selection:

- ROC-AUC (due to class imbalance)

## Results Summary

- Logistic Regression achieved the highest ROC-AUC
- It also showed the best recall for churn prediction
- Random Forest and XGBoost had high accuracy but very low recall
- Neural Network underperformed due to limited data size

## Best Model

- Selected model: **Logistic Regression**
- Reason:
  - Best overall ranking performance (ROC-AUC)
  - Better ability to identify churn cases

## Outputs

- Best model saved as: `models/best_model.pkl`
- Metrics saved in: `evaluation/metrics.json`
- Confusion matrix saved as image
