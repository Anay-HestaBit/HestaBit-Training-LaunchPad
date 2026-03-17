# Day 4: Inference Optimisation & Benchmarking Report

## 1. Project Objective

The goal was to take our Fine-Tuned model and make it run as efficiently as possible. We tested three versions of the model:

1.  **Base Model:** The original TinyLlama.
2.  **Fine-Tuned Model:** Our version trained on the coding domain.
3.  **GGUF Model:** A compressed (quantized) version designed to run fast on standard CPUs.

---

## 2. What We Implemented

### A. Quantization (GGUF)

We converted the model into **GGUF (8-bit)** format. This shrinks the model size so it fits into System RAM, allowing it to run on a normal laptop without needing an expensive Graphics Card (GPU).

### B. Batch Inference

Instead of asking the model one question at a time, we sent multiple coding prompts (Logic, Syntax, and Explanation) at once. This keeps the processor busy and increases the number of words generated per second.

### C. Token Streaming

We enabled "Streaming" so the model doesn't wait to finish the whole paragraph before showing it. It "types" out the code word-by-word, which makes the AI feel much more responsive.

### D. Engine Comparison

We compared two ways of running the model:

- **Transformers (PyTorch):** The standard way, great for GPUs but very slow on CPUs.
- **llama.cpp:** An engine optimized specifically for high-speed CPU performance.

---

## 3. Performance Results

### GPU Results (Google Colab / T4)

On the GPU, the model is incredibly fast because it can handle thousands of calculations at once.

- **Throughput:** ~35–65 Tokens per second.
- **VRAM Usage:** ~2.5 GB.
- **Observation:** The Fine-Tuned model performed better than the Base model here.

### CPU Results (Local Machine)

This is where we see the real impact of our optimizations. Standard models struggle on a CPU, but our GGUF version shines.

| Model       | Engine        | Speed (Tokens/sec) | Total Time (3 Prompts) | Accuracy |
| :---------- | :------------ | :----------------- | :--------------------- | :------- |
| Base-Model  | Transformers  | 1.94               | 90.07s                 | 80.5%    |
| Fine-Tuned  | Transformers  | 2.85               | 91.65s                 | 82.0%    |
| **GGUF-Q8** | **llama.cpp** | **7.41**           | **28.35s**             | 77.9%    |

---

## 4. Final Conclusion

- **GGUF is the Winner for CPU:** Switching from standard Transformers to `llama.cpp` made the model **2.6x faster** on a local computer.
- **Memory Efficiency:** By using CPU-based inference, we reduced **VRAM usage to 0 MB**, making the model usable on any standard device.
- **Trade-off:** We lost about 4% accuracy in exchange for this massive speed boost, which is a fair trade for local deployment.
