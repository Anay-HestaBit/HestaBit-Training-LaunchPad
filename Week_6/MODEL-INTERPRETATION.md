# Model Interpretation — Week 6

## Final Model

- Logistic Regression (L2, C=0.01)

## Why this model

- Highest ROC-AUC across all experiments
- Stable performance across folds
- Simple and interpretable
- Aligns with business intuition

## Key Drivers of Churn

From coefficients and SHAP:

- Short tenure increases churn risk
- Month-to-month contracts churn more
- High monthly charges increase churn
- More tech support calls indicate dissatisfaction
- Long tenure and yearly contracts reduce churn

## Error Analysis

- Model favors recall over precision
- False positives are acceptable for retention actions
- Few false negatives relative to other models

## Explainability

- Coefficient plot explains direction of impact
- SHAP summary shows feature impact distribution
- Results are consistent with EDA findings

## Conclusion

The model is suitable for production use with:

- Clear interpretability
- Stable performance
- Low operational risk
