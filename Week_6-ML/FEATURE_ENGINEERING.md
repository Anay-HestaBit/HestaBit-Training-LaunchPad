# Feature Engineering & Selection – Day 2

## Objective

The goal of Day 2 was to create meaningful features from the cleaned dataset and select the most important features for prediction, without training a full machine learning model.

---

## Dataset Used

- Loan Approval Dataset
- Target variable: `loan_status` (Approved / Rejected)
- Type of problem: Classification

---

## Feature Engineering

New features were created to better represent customer financial behavior and loan risk.

### Engineered Features

- `total_assets`  
  Sum of residential, commercial, luxury, and bank assets.

- `log_income`  
  Log-transformed annual income to reduce skewness.

- `log_loan_amount`  
  Log-transformed loan amount.

- `log_total_assets`  
  Log-transformed total assets.

- `loan_to_income_ratio`  
  Ratio of loan amount to annual income.

- `loan_to_assets_ratio`  
  Ratio of loan amount to total assets.

- `high_income_flag`  
  1 if income is above median, else 0.

- `high_cibil_flag`  
  1 if CIBIL score ≥ 750, else 0.

In total, **10+ new features** were added.

---

## Categorical Encoding

- `education`  
  Encoded using **Label Encoding** (ordinal feature).

- `self_employed`  
  Encoded using **One-Hot Encoding**.

- Target variable `loan_status`  
  Mapped to binary values:
  - Approved → 1
  - Rejected → 0

---

## Feature Scaling

- Numerical features were scaled using **StandardScaler**
- This ensures all features are on a similar scale for analysis

---

## Feature Selection

Three feature selection techniques were applied:

### 1. Correlation Filter

- Highly correlated features (correlation > 0.9) were removed
- This helps reduce redundancy

### 2. Mutual Information

- Measures how much information each feature provides about the target
- Top features were selected based on MI score
- Feature importance was visualized using a bar chart

### 3. Recursive Feature Elimination (RFE)

- Logistic Regression was used as the base estimator
- Final set of most important features was selected

---

## Outputs Generated

- `X_train_selected.csv`
- `X_test_selected.csv`
- `feature_list.json`
- `feature_importance.png`

---

## Key Observations

- Only a few engineered features contribute strongly to predicting loan approval
- Financial ratios and credit score–related features were the most informative
- Many features provided little information and were safely removed

---

## Conclusion

Feature engineering and selection helped simplify the dataset while keeping the most useful information.  
This prepares the data for effective model training in the next stage.
