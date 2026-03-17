import asyncio
from collections import deque
from agents.research_agent import build_research_agent
from agents.summarizer_agent import build_summarizer_agent
from agents.answer_agent import build_answer_agent


def format_memory(memory_window) -> str:
    if not memory_window:
        return "No previous conversation."
    return "\n".join(f"{role.upper()}: {content}" for role, content in memory_window)


async def run_pipeline(query: str, memory_window):
    research_agent = build_research_agent()
    summarizer_agent = build_summarizer_agent()
    answer_agent = build_answer_agent()
    recent_context = format_memory(memory_window)

    # STEP 1 — RESEARCH
    print("\n--- STEP 1: RESEARCH ---\n")
    research_prompt = (
        "Use recent conversation only when helpful for the current question.\n\n"
        f"RECENT CONVERSATION:\n{recent_context}\n\n"
        f"CURRENT USER QUESTION:\n{query}"
    )
    research_result = await research_agent.run(task=research_prompt)
    research_text = research_result.messages[-1].content
    print(research_text)

    # STEP 2 — SUMMARIZE
    print("\n--- STEP 2: SUMMARIZE ---\n")
    summary_result = await summarizer_agent.run(task=research_text)
    summary_text = summary_result.messages[-1].content
    print(summary_text)

    # STEP 3 — FINAL ANSWER
    print("\n--- STEP 3: FINAL ANSWER ---\n")
    final_prompt = (
        f"Recent Conversation:\n{recent_context}\n\n"
        f"User Question:\n{query}\n\n"
        f"Summary:\n{summary_text}\n\n"
        "Answer the user's question using ONLY the summary."
    )
    final_result = await answer_agent.run(task=final_prompt)
    final_text = final_result.messages[-1].content
    print(final_text)
    memory_window.append(("user", query))
    memory_window.append(("assistant", final_text))

if __name__ == "__main__":
    memory_window = deque(maxlen=10)  # Sliding window: keeps only latest 10 messages
    while True:
        query = input("What would you like to research? (type 'exit' or 'clear'): ")
        if query.lower() == 'exit':
            break
        if query.lower() == "clear":
            memory_window.clear()
            print("Memory window cleared.")
            continue
        asyncio.run(run_pipeline(query, memory_window))
