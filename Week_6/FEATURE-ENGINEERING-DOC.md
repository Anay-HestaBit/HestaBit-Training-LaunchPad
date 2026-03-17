# Feature Engineering — Week 6 · Day 2

## Input

- Source file: `src/data/processed/final.csv`
- Target: `churn_label`

## Feature Engineering Steps

- Created simple business-driven features based on:
  - Tenure
  - Charges
  - Usage
  - Payment behavior
  - Login activity
- Examples:
  - Long vs short tenure
  - High vs low charges
  - Dormant vs active users
  - Support call and late payment rates

## Encoding & Scaling

- Categorical features encoded using One-Hot Encoding
- Numerical features scaled using StandardScaler
- No target leakage introduced

## Feature Selection

Used three techniques:

1. Correlation with target
2. Mutual Information
3. Recursive Feature Elimination (Logistic Regression)

The final feature set was selected by combining rankings from all three methods.

## Outputs

- `X_train.csv`, `X_test.csv`
- `y_train.csv`, `y_test.csv`
- `feature_list.json`
- `feature_importance.png`

## Notes

- Feature importance shows tenure and contract-related features as most important
- Results align with EDA findings from Day 1
