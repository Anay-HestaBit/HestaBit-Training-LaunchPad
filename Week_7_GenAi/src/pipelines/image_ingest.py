import sys
import json
import uuid
import re
import fitz
import pytesseract
import torch
from PIL import Image
from pathlib import Path
from tqdm import tqdm
from transformers import BlipProcessor, BlipForConditionalGeneration

PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

RAW_DATA = Path("src/data/raw")
IMAGE_DIR = Path("src/data/images")
METADATA_FILE = Path("src/data/clip_metadata.jsonl")


def clean_ocr(text):
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[^a-zA-Z0-9.,:/\-\s]", "", text)
    return text.strip()


def useful_image(path, ocr, caption):
    img = Image.open(path)
    w, h = img.size

    if w < 200 or h < 200:
        return False

    caption_low = caption.lower()

    if any(word in caption_low for word in ["logo", "brand", "trademark"]):
        return False

    if any(
        word in caption_low
        for word in [
            "chart",
            "graph",
            "diagram",
            "flow",
            "architecture",
            "table",
            "plot",
        ]
    ):
        return True

    digits = sum(c.isdigit() for c in ocr)
    if digits > 15:
        return True

    if w > 450 and h > 450:
        return True

    return False


def short_text(source, page, caption, ocr):
    ocr = ocr[:700]
    ocr = " ".join(ocr.split()[:70])
    return f"{source} page {page}. {caption}. {ocr}"


def extract_images(pdf_path):
    doc = fitz.open(pdf_path)
    items = []

    for p in range(len(doc)):
        page = doc[p]
        for img in page.get_images(full=True):
            xref = img[0]
            base = doc.extract_image(xref)

            img_bytes = base["image"]
            ext = base["ext"]

            img_id = str(uuid.uuid4())
            img_path = IMAGE_DIR / f"{img_id}.{ext}"

            with open(img_path, "wb") as f:
                f.write(img_bytes)

            items.append((img_path, pdf_path.name, p + 1))

    doc.close()
    return items


def run():
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    device = "cuda" if torch.cuda.is_available() else "cpu"

    processor = BlipProcessor.from_pretrained(
        "Salesforce/blip-image-captioning-base", local_files_only=True
    )

    model = BlipForConditionalGeneration.from_pretrained(
        "Salesforce/blip-image-captioning-base", local_files_only=True
    )

    model.to(device)
    model.eval()

    pdfs = list(RAW_DATA.glob("*.pdf"))

    with open(METADATA_FILE, "w", encoding="utf-8") as writer:
        for pdf in tqdm(pdfs):
            images = extract_images(pdf)

            for path, source, page in images:
                try:
                    image = Image.open(path).convert("RGB")

                    ocr = clean_ocr(pytesseract.image_to_string(image))

                    inputs = processor(images=image, return_tensors="pt").to(device)
                    out = model.generate(**inputs)
                    caption = processor.decode(out[0], skip_special_tokens=True)

                    if not useful_image(path, ocr, caption):
                        continue

                    retrieval_text = short_text(source, page, caption, ocr)

                    record = {
                        "image_path": str(path),
                        "source": source,
                        "page": page,
                        "caption": caption,
                        "ocr_text": ocr,
                        "retrieval_text": retrieval_text,
                    }

                    writer.write(json.dumps(record) + "\n")

                except:
                    continue


if __name__ == "__main__":
    run()
