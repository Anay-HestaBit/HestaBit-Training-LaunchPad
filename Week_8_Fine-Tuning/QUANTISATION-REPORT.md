# Quantisation Report - Week 8 Day 3

## What We Did

We took the fine-tuned TinyLlama model from Day 2 and converted it into three
smaller formats — INT8, INT4, and GGUF. The goal was to reduce model size while
keeping quality acceptable, and to enable CPU inference using GGUF.

## Model

- base_model : TinyLlama/TinyLlama-1.1B-Chat-v1.0
- fine_tuned : Yes (Day 2 QLoRA adapters merged)
- tool_used : BitsAndBytes (INT8/INT4), llama.cpp (GGUF)

## Benchmark Results

| Format | Size    | Speed (tokens/sec) | Device      | Code Quality |
| ------ | ------- | ------------------ | ----------- | ------------ |
| FP16   | 2.20 GB | 21.15              | GPU (T4)    | 10/10        |
| INT8   | 1.24 GB | 8.90               | GPU (T4)    | 10/10        |
| INT4   | 0.81 GB | 23.13              | GPU (T4)    | 10/10        |
| GGUF   | 1.17 GB | 15.82              | CPU (local) | 10/10        |

## Quality Test Method

We tested quality by running the generated code against 10 test cases:

```python
test_cases = [2, 3, 5, 7, 10, 12, 13, 1, 0, -1]
expected   = {2: True, 3: True, 5: True, 7: True, 10: False,
              12: False, 13: True, 1: False, 0: False, -1: False}
```

All three formats produced functionally correct Python code.
Quantisation did not degrade code quality for this task.

## Quality Observations

FP16 — basic loop, correct output, no edge case handling beyond num < 2
INT8 — cleaner code, added example usage in output
INT4 — more efficient loop (checks up to num/2), handles more edge cases
GGUF — correct output, ran on CPU without any GPU

## Key Observations

INT8 is the slowest despite being smaller than FP16. This is because every
computation requires converting INT8 weights back to FP16 at runtime, which
adds overhead.

INT4 is actually faster than FP16 on GPU because the NF4 format is specifically
optimized for GPU memory access patterns.

GGUF running at 15.82 tokens/sec on CPU is the most practical format for
deployment on machines without a GPU. This is what tools like Ollama and
LM Studio use internally.

Quantisation reduced model size by up to 63% (FP16 to INT4) with zero quality
loss on code generation tasks.

## Output Files

- quantized/model-fp16/ → merged model in full precision
- quantized/model-int8/ → 8-bit quantized model
- quantized/model-int4/ → 4-bit quantized model
- quantized/model.gguf → GGUF format for CPU inference
