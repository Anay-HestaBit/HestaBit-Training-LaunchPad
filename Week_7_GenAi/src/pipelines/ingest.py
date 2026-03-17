import sys
import json
import uuid
from pathlib import Path
from tqdm import tqdm
from langchain_text_splitters import RecursiveCharacterTextSplitter

PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.utils.text_cleaner import clean_text
from src.utils.pdf_processor import extract_text_and_tables
from src.utils.logger import logger
from src.config.settings import RAW_DATA_PATH, CHUNK_SIZE, CHUNK_OVERLAP, CHUNKS_PATH


def process_documents():
    logger.info("Starting ingestion with Page-Level Metadata")

    pdf_files = list(Path(RAW_DATA_PATH).glob("*.pdf"))

    if not pdf_files:
        logger.error(f"No PDF files found in {RAW_DATA_PATH}")
        return []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    all_chunks = []

    for pdf_file in tqdm(pdf_files, desc="Processing PDFs", unit="file"):
        try:
            logger.info(f"Reading file: {pdf_file.name}")

            pages = extract_text_and_tables(str(pdf_file))

            for page_data in pages:
                cleaned_text = clean_text(page_data["text"])

                if not cleaned_text:
                    continue

                text_chunks = splitter.split_text(cleaned_text)

                # Step 4: Tag every chunk
                for idx, text in enumerate(text_chunks):
                    chunk_data = {
                        "chunk_id": str(uuid.uuid4()),
                        "text": text,
                        "metadata": {
                            "source": pdf_file.name,
                            "page": page_data["page"],
                            "chunk_index": idx,
                        },
                    }
                    all_chunks.append(chunk_data)

        except Exception as e:
            logger.error(f"Failed to process {pdf_file.name}: {e}")

    logger.info(f"Processed {len(pdf_files)} files into {len(all_chunks)} chunks")
    return all_chunks


def save_chunks(chunks):
    if not chunks:
        logger.warning("No chunks to save!")
        return

    Path(CHUNKS_PATH).parent.mkdir(parents=True, exist_ok=True)
    with open(CHUNKS_PATH, "w", encoding="utf-8") as f:
        for chunk in chunks:
            f.write(json.dumps(chunk, ensure_ascii=False) + "\n")
    logger.info(f"Saved to {CHUNKS_PATH}")


def main():
    chunks = process_documents()
    save_chunks(chunks)


if __name__ == "__main__":
    main()
