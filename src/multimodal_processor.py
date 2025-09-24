import whisper
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
from sentence_transformers.util import cos_sim 

def process_input(input_json):
    query = f"Business: {input_json['business_idea']} Audience: {input_json['target_audience']} Value: {input_json['value_proposition']}"

    if 'audio' in input_json:
        model = whisper.load_model('tiny.en')
        transcript = model.transcribe(input_json['audio'])['text']
        query += f" Audio: {transcript}"
    
    if 'pdf' in input_json:
        doc = fitz.open(stream=input_json['pdf'], filetype="pdf")
        text = "".join(page.get_text() for page in doc)
        query += f" PDF: {text}"
    
    if 'image' in input_json:
        img = Image.open(input_json['image'])
        ocr_text = pytesseract.image_to_string(img)
        query += f" Image: {ocr_text}"
    
    return query
