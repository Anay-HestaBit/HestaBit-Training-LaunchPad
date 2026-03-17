# Data Report — Week 6 · Day 1

## Dataset Overview

- Rows: 2500
- Target: `churn_label` (binary)
- Source: Customer-level churn dataset
- Granularity: One row per customer

---

## Initial Data Issues Identified

- Identifier column present (`customer_id`)
- Missing values in:
  - `credit_score`
  - `tech_support_calls`
  - `payment_method`
- Categorical inconsistency in `gender`
- Invalid and mixed-format dates in `last_login_date`
- Extreme values in `tenure_months`
- Heavy skew in `monthly_gb_download`
- Redundant feature: `total_charges`

---

## Cleaning & Transformation Decisions

### Dropped Columns

- `customer_id` (identifier)
- `total_charges` (redundant with tenure and monthly charges)

### Missing Values

- `credit_score` → median imputation + `credit_score_missing` flag
- `tech_support_calls` → filled with 0
- `payment_method` → filled with `"unknown"`

### Categorical Normalization

- `gender` normalized to lowercase canonical values (`male`, `female`)

### Numeric Handling

- `tenure_months` capped at 120
- `monthly_gb_download` log-transformed (`log1p`)
- `account_manager` converted to boolean

### Date Processing

- `last_login_date` parsed with error coercion
- Invalid dates handled explicitly
- Derived feature: `days_since_last_login`
- Original date column dropped

---

## Final Dataset Characteristics

- No missing values
- No identifier leakage
- No extreme or invalid outliers
- No highly correlated or redundant features
- Suitable for modeling and feature engineering

Final file: src/data/processed/final.csv
