# app/api.py
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.generate_strategy import generate_dashboard
import os

app = FastAPI(title="Chispa GTM Strategy Generator")

# ✅ Add CORS middleware here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/generate_strategy")
def generate_strategy_endpoint(
    business_idea: str = Form(...),
    target_audience: str = Form(...),
    value_proposition: str = Form(...)
):
    """
    Accepts business details and generates a GTM strategy dashboard.
    """
    user_input = {
        "business_idea": business_idea,
        "target_audience": target_audience,
        "value_proposition": value_proposition
    }
    dashboard_output = generate_dashboard(user_input)
    return dashboard_output

@app.get("/")
def read_root():
    return {"message": "Chispa GTM Strategy Generator is running. Use the /generate_strategy endpoint to create a plan."}
