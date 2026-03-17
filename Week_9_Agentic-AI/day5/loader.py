import os
from dotenv import load_dotenv

# hide HF warning
os.environ.setdefault("HF_HUB_DISABLE_WARNING", "1")
os.environ.setdefault("TRANSFORMERS_VERBOSITY", "error")

from autogen_ext.models.openai import OpenAIChatCompletionClient

load_dotenv()


class LLMClient:

    def __init__(self, response_structure=None):
        model_name = os.getenv("LLM_MODEL", "openai/gpt-oss-120b")
        base_url = os.getenv("LLM_BASE_URL", "https://api.groq.com/openai/v1")
        api_key = os.getenv("LLM_API_KEY")

        self.client = OpenAIChatCompletionClient(
            model=model_name,
            base_url=base_url,
            api_key=api_key,
            model_info={
                "family": "llama",
                "context_length": 8192,
                "function_calling": True,
                "vision": False,
                "json_output": False,
                "structured_output": True,
            },
            response_format=response_structure,
        )
