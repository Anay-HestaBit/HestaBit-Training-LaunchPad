from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from .model_loader import get_model
from .schemas import GenerateRequest, ChatRequest
from .memory import add_message, get_history
from .logger import get_request_id
from .guardrails import is_programming_related
import logging

app = FastAPI(title="Week 8 Local LLM API")

llm = get_model()


def build_single_prompt(system_prompt, user_prompt):
    return f"""### System:
{system_prompt}

### Instruction:
{user_prompt}

### Response:
"""


def build_chat_prompt(system_prompt, history):
    conversation = ""

    for msg in history:
        if msg["role"] == "user":
            conversation += f"### Instruction:\n{msg['content']}\n\n"
        elif msg["role"] == "assistant":
            conversation += f"### Response:\n{msg['content']}\n\n"

    return f"""### System:
{system_prompt}

{conversation}
### Response:
"""


def generate_stream_response(prompt, params):
    def stream():
        full_response = ""

        for chunk in llm(
            prompt,
            max_tokens=params["max_tokens"],
            temperature=params["temperature"],
            top_p=params["top_p"],
            top_k=params["top_k"],
            repeat_penalty=1.15,
            stop=["### Instruction:", "### System:"],
            stream=True,
        ):
            token = chunk["choices"][0]["text"]
            full_response += token
            yield token

    return stream()


def generate_full_response(prompt, params):
    chunks = []

    for token in generate_stream_response(prompt, params):
        chunks.append(token)

    return "".join(chunks).strip()


@app.post("/generate/stream")
def generate_stream(request: GenerateRequest):
    request_id = get_request_id()
    logging.info(f"{request_id} | generate_stream")

    if not is_programming_related(request.prompt):
        return StreamingResponse(
            iter(["I can only answer programming-related questions."]),
            media_type="text/plain",
        )

    prompt = build_single_prompt(request.system_prompt, request.prompt)

    params = {
        "max_tokens": request.max_tokens,
        "temperature": request.temperature,
        "top_p": request.top_p,
        "top_k": request.top_k,
    }

    return StreamingResponse(
        generate_stream_response(prompt, params),
        media_type="text/plain",
    )


@app.post("/generate")
def generate(request: GenerateRequest):
    request_id = get_request_id()
    logging.info(f"{request_id} | generate")

    if not is_programming_related(request.prompt):
        return {
            "request_id": request_id,
            "response": "I can only answer programming-related questions.",
        }

    prompt = build_single_prompt(request.system_prompt, request.prompt)

    params = {
        "max_tokens": request.max_tokens,
        "temperature": request.temperature,
        "top_p": request.top_p,
        "top_k": request.top_k,
    }

    return {
        "request_id": request_id,
        "response": generate_full_response(prompt, params),
    }


@app.post("/chat/stream")
def chat_stream(request: ChatRequest):
    request_id = get_request_id()
    logging.info(f"{request_id} | chat_stream")

    history = get_history(request.session_id)[-2:]

    current_is_programming = is_programming_related(request.message)

    recent_programming_context = any(
        is_programming_related(msg["content"])
        for msg in history
    )

    if not current_is_programming and not recent_programming_context:
        return StreamingResponse(
            iter(["I can only answer programming-related questions."]),
            media_type="text/plain",
        )

    add_message(request.session_id, "user", request.message)
    history = get_history(request.session_id)[-6:]

    prompt = build_chat_prompt(request.system_prompt, history)

    params = {
        "max_tokens": request.max_tokens,
        "temperature": request.temperature,
        "top_p": request.top_p,
        "top_k": request.top_k,
    }

    def stream():
        full_response = ""

        for chunk in llm(
            prompt,
            max_tokens=params["max_tokens"],
            temperature=params["temperature"],
            top_p=params["top_p"],
            top_k=params["top_k"],
            repeat_penalty=1.15,
            stop=["### Instruction:", "### System:"],
            stream=True,
        ):
            token = chunk["choices"][0]["text"]
            full_response += token
            yield token

        add_message(request.session_id, "assistant", full_response.strip())

    return StreamingResponse(stream(), media_type="text/plain")


@app.post("/chat")
def chat(request: ChatRequest):
    request_id = get_request_id()
    logging.info(f"{request_id} | chat")

    history = get_history(request.session_id)[-2:]

    current_is_programming = is_programming_related(request.message)
    recent_programming_context = any(
        is_programming_related(msg["content"])
        for msg in history
    )

    if not current_is_programming and not recent_programming_context:
        return {
            "request_id": request_id,
            "response": "I can only answer programming-related questions.",
        }

    add_message(request.session_id, "user", request.message)
    history = get_history(request.session_id)[-6:]

    prompt = build_chat_prompt(request.system_prompt, history)

    params = {
        "max_tokens": request.max_tokens,
        "temperature": request.temperature,
        "top_p": request.top_p,
        "top_k": request.top_k,
    }

    response_text = generate_full_response(prompt, params)
    add_message(request.session_id, "assistant", response_text)

    return {
        "request_id": request_id,
        "session_id": request.session_id,
        "response": response_text,
    }
