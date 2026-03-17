# Week 8 - LLM Fine-Tuning, Quantization, and Deployment

This project implements an end-to-end Week 8 workflow:

- Instruction dataset cleaning and analysis
- QLoRA fine-tuning (TinyLlama 1.1B)
- Quantization (FP16, INT8, INT4, GGUF)
- Inference benchmarking (Transformers vs llama.cpp)
- Local deployment with FastAPI + Streamlit (streaming responses)

## Project Layout

```text
Week_8_Fine-Tuning/
├── data/                     # train.jsonl, val.jsonl
├── utils/                    # data cleaner
├── notebooks/                # Day-wise notebooks
├── adapters/                 # LoRA adapters
├── quantized/                # FP16, INT8, INT4, GGUF model artifacts
├── inference/                # inference and streaming tests
├── benchmarks/               # benchmark CSV outputs
├── deploy/                   # FastAPI app + model loader + schemas
├── output/                   # analysis and benchmark plots
├── streamlit_app.py          # Streamlit UI
├── requirements.txt
└── Dockerfile
```

## Requirements

- Python 3.10+
- A valid GGUF model at `quantized/model.gguf`

Install dependencies:

```bash
pip install -r requirements.txt
```

## Run Locally

From `Week_8_Fine-Tuning`:

1. Start FastAPI backend

```bash
uvicorn deploy.app:app --host 0.0.0.0 --port 8000
```

2. Start Streamlit UI (new terminal)

```bash
streamlit run streamlit_app.py --server.port 8501 --server.address 0.0.0.0
```

Access:

- FastAPI docs: `http://127.0.0.1:8000/docs`
- Streamlit app: `http://127.0.0.1:8501`

## API Endpoints

- `POST /generate`
- `POST /chat`
- `POST /generate/stream`
- `POST /chat/stream`

The non-stream endpoints return JSON payloads. The `/stream` variants return streamed plain-text token output.

Example (`/generate`):

```bash
curl -X POST "http://127.0.0.1:8000/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "system_prompt": "You are a strict coding assistant.",
    "prompt": "Write a Python function to check if a number is prime.",
    "max_tokens": 256,
    "temperature": 0.3,
    "top_p": 0.9,
    "top_k": 40
  }'
```

Example (`/generate/stream`):

```bash
curl -N -X POST "http://127.0.0.1:8000/generate/stream" \
  -H "Content-Type: application/json" \
  -d '{
    "system_prompt": "You are a strict coding assistant.",
    "prompt": "Write a Python function to check if a number is prime.",
    "max_tokens": 256,
    "temperature": 0.3,
    "top_p": 0.9,
    "top_k": 40
  }'
```

## Benchmarking

Run CPU benchmark script:

```bash
python inference/test_inference.py
```

Output:

- `benchmarks/results.csv`

## Docker

Build and run:

```bash
docker build -t tinyllama-week8 .
docker run -p 8000:8000 -p 8501:8501 tinyllama-week8
```

## Notes

- The backend guardrail is programming-domain restricted.
- Chat mode uses in-memory session history.
- `deploy/config.py` controls model path and runtime settings.
- The requirements file includes both deployment dependencies and the training stack referenced in the Week 8 brief.
