# Dataset Analysis - Week 8 Day 1

## Dataset Used

I used the sahil2801/CodeAlpaca-20k dataset from HuggingFace.
It had 20,022 coding-specific samples in instruction/input/output format, covering topics like Python, algorithms, debugging, and SQL.

## Problems in the Dataset

- 28 samples had empty outputs — no useful information to learn from
- 456 samples were too short (less than 15 tokens) — too brief to be meaningful
- 230 samples were too long (more than 256 tokens) — too long for a small model to handle efficiently
- Total removed: 714 samples

## Split the Data into Train and Validation samples

After cleaning I sampled 1,500 rows and split them into 80% train and 20% validation:

- Train: 1,200 samples
- Validation: 300 samples

## Samples in the Dataset

Each sample was labeled based on keywords found in the instruction:

- QA: 600 samples — questions like write, create, build, fix, debug
- Reasoning: 525 samples — questions like explain, compare, analyze, why
- Extraction: 375 samples — questions like list, find, identify, summarize

## Token length statistics

Token length was calculated by counting words across instruction, input, and output fields combined:

- Minimum: 15 tokens
- Maximum: 256 tokens
- Average: ~50 tokens
- Median: ~38 tokens

## Output files/Deliverables

- data/train.jsonl
- data/val.jsonl
- data/analysis.png
- utils/data_cleaner.py
