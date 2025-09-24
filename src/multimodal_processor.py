# src/multimodal_processor.py
import io
from typing import Dict
from PIL import Image
import fitz  # PyMuPDF
import pytesseract

_whisper_model = None
def _as_text_from_audio(wav_bytes: bytes) -> str:
    global _whisper_model
    try:
        import whisper
    except Exception:
        return ""
    if _whisper_model is None:
        _whisper_model = whisper.load_model("tiny.en")
    # whisper expects a file path or numpy audio; for hackathon, skip if not trivial
    # Here we return empty string unless integrated with proper audio decoding
    return ""

def _pdf_to_text(pdf_bytes: bytes) -> str:
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    return "".join(page.get_text() for page in doc)

def _image_to_text(img_bytes: bytes) -> str:
    img = Image.open(io.BytesIO(img_bytes))
    return pytesseract.image_to_string(img)

def process_input(input_json: Dict) -> str:
    query = f"Business: {input_json.get('business_idea','')} Audience: {input_json.get('target_audience','')} Value: {input_json.get('value_proposition','')}"
    fb = input_json.get("file_bytes")
    fmime = input_json.get("file_mime", "")
    if fb and "pdf" in fmime:
        query += f" PDF: {_pdf_to_text(fb)}"
    elif fb and ("image" in fmime or "png" in fmime or "jpeg" in fmime or "jpg" in fmime):
        query += f" Image: {_image_to_text(fb)}"
    elif fb and ("audio" in fmime or fmime.endswith("/wav") or fmime.endswith("/m4a") or fmime.endswith("/mp3")):
        query += f" Audio: {_as_text_from_audio(fb)}"
    return query
