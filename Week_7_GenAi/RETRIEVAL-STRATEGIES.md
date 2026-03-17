# Retrieval Strategies (Day 2)

This project uses a multi-stage retrieval pipeline to improve answer accuracy and reduce hallucination in downstream LLM responses.

---

## 1. Hybrid Retrieval

We use **hybrid search** to maximize recall.

### Components

- **Semantic search**: Vector similarity using sentence embeddings
- **Keyword search**: BM25-based lexical matching

### Why

- Semantic search captures meaning
- Keyword search captures exact terms, numbers, and entities
- Combining both reduces missed relevant chunks

---

## 2. Candidate Merging & Deduplication

Results from semantic and keyword search are:

- Merged using chunk identifiers
- Deduplicated to avoid repeated content

Each chunk retains metadata such as:

- Source document
- Page number
- Retrieval type (semantic / keyword / both)

---

## 3. Reranking

A **cross-encoder reranker** is applied on the merged candidates.

### Purpose

- Determine which chunks actually answer the user query
- Improve precision beyond similarity-based retrieval

Chunks are reordered based on rerank scores.

---

## 4. Diversity Selection (MMR)

After reranking, diversity-aware selection is applied.

### Goal

- Avoid redundant chunks
- Preserve the most relevant chunk
- Include complementary context when needed

---

## 5. Context Building

Final selected chunks are assembled into a structured context:

- Clearly separated source blocks
- Traceable metadata for each chunk
- Ready for direct grounding in LLM prompts

---

## Outcome

This retrieval pipeline provides:

- Higher precision
- Lower hallucination risk
- Fully traceable context for LLM usage
