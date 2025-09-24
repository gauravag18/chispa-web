# app/api.py
from typing import Optional, Literal
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from src.generate_strategy import generate_dashboard, regenerate_for_tab  # now exists

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-prod-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _map_file(input_json: dict, file: UploadFile):
    # Normalize UploadFile -> multimodal keys expected by processor
    mime = (file.content_type or "").lower()
    input_json["file_name"] = file.filename
    input_json["file_mime"] = mime
    return input_json

@app.post("/generate_strategy")
async def generate_strategy(
    business_idea: str = Form(...),
    target_audience: str = Form(...),
    value_proposition: str = Form(...),
    file: Optional[UploadFile] = File(None),
):
    input_json = {
        "business_idea": business_idea,
        "target_audience": target_audience,
        "value_proposition": value_proposition,
    }
    if file:
        content = await file.read()
        input_json["file_bytes"] = content
        input_json = _map_file(input_json, file)

    try:
        return generate_dashboard(input_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class RegenerateRequest(BaseModel):
    prompt: str

@app.post("/regenerate/{tab}")
async def regenerate(
    tab: Literal["personas", "messaging", "channels", "calendar", "budget_kpis"],
    body: RegenerateRequest,
):
    try:
        text = regenerate_for_tab(tab, body.prompt)
        return {"tab": tab, "text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
