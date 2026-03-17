# Multimodal RAG – Image RAG (Day 3)

## Overview

This implementation builds an Image RAG pipeline.

It supports:

- PNG, JPG
- Scanned PDFs
- Forms and diagrams

The system generates:

- OCR text (Tesseract)
- Image captions (BLIP)
- CLIP embeddings
- FAISS vector index

---

## Pipeline Steps

### 1. Image Ingestion

- Extract images from PDFs
- Run OCR on each image
- Generate BLIP caption
- Save metadata to JSONL

Each record contains:

{
image_path,
source_pdf,
caption,
ocr_text
}

---

### 2. Embedding Generation

- Load CLIP model (openai/clip-vit-base-patch32)
- Generate normalized embeddings
- Save embeddings as .npy
- Build FAISS IndexFlatIP
- Store FAISS index

CLIP places text and image in the same vector space.

---

### 3. Retrieval Modes

Text → Image

- Encode text query
- Search FAISS
- Return top-k images

Image → Image

- Encode input image
- Search FAISS
- Return similar images

Image → Text

- Retrieve similar images
- Combine captions + OCR text
- Return context

---

## Similarity

- Embeddings are L2 normalized
- FAISS IndexFlatIP used
- Inner Product = Cosine Similarity

---

## Status

Completed:

- Image extraction
- OCR generation
- Caption generation
- CLIP embeddings
- FAISS index creation
- Text → Image retrieval
- Image → Image retrieval
- Image → Text context building
