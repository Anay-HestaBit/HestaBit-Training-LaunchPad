# RAG Architecture – Day 1

## Objective

Build a **local document retrieval system** as the foundation of a RAG pipeline.  
Day 1 focuses only on **ingestion, chunking, embeddings, vector storage, and retrieval**.  
No LLM-based answer generation is included.

---

## What the System Does

1. Loads enterprise PDF documents
2. Cleans and splits text into chunks
3. Generates embeddings locally
4. Stores embeddings in a FAISS vector database
5. Retrieves relevant chunks for a user query

---

## High-Level Flow

PDF Files
↓
Text Cleaning
↓
Chunking (500–800 tokens)
↓
Embedding Generation
↓
FAISS Vector Store
↓
Retriever (User Query → Relevant Chunks)

---

## Pipeline Steps

### 1. Ingestion

- PDFs are loaded from `src/data/raw`
- Text is extracted page-wise
- Metadata stored: source file and page number

---

### 2. Text Cleaning

- Removes extra newlines
- Normalizes spaces
- Keeps content readable for chunking

---

### 3. Chunking

- Text is split into chunks of 500–800 tokens
- Small overlap is used to preserve context
- Each chunk stores:
  - text
  - source PDF
  - page number
  - chunk index

Output file: `chunks.jsonl`

---

### 4. Embedding Generation

- Each chunk is converted into a vector
- Local sentence-transformer model is used
- Embeddings are normalized for cosine similarity

Output files:

- `embeddings.npy`
- `metadata.jsonl`

---

### 5. Vector Store (FAISS)

- Embeddings are indexed using FAISS
- Index type: Flat Inner Product
- Enables fast semantic similarity search

Output file:

- `faiss.index`
- `metadata.json`

---

### 6. Retrieval

- User enters a natural language query
- Query is embedded using the same model
- FAISS returns top-K most similar chunks
- Retrieved chunks are displayed with source and page number

Note:  
This step **only retrieves text**. It does not generate answers.

---

## Conclusion

At the end of Day 1, a **working local semantic retrieval system** is implemented.  
This system forms the base for advanced RAG features in the next stages.
