# app/api.py
from fastapi import FastAPI, Form
from pydantic import BaseModel
from src.generate_strategy import generate_dashboard
import os

# Create an __init__.py file in the 'src' and 'app' directories if they don't exist
# touch src/__init__.py
# touch app/__init__.py

app = FastAPI(title="Chispa GTM Strategy Generator")

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