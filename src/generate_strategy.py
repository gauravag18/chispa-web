import json
import google.generativeai as genai
import os
import yaml
from pathlib import Path
from dotenv import load_dotenv
from .rag_retriever import retrieve_context

# --- Load Config and Models ---
config = yaml.safe_load(Path("config.yaml").read_text(encoding="utf-8"))
load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
gemini_model = genai.GenerativeModel('gemini-1.5-flash-latest')

# --- Main Generation Function ---
def generate_dashboard(user_input: dict) -> dict:
    user_query = f"Business Idea: {user_input['business_idea']} for {user_input['target_audience']} with the value proposition: {user_input['value_proposition']}"
    
    # Step 1: Retrieve context using RAG
    rag_context = retrieve_context(query=user_query, top_k=config['rag']['top_k'])
    
    print("\nRetrieved RAG context. Now generating complete dashboard with competitors...")

    # Step 2: Create a single, powerful prompt that asks for JSON output
    prompt = f"""
    You are a world-class Go-to-Market (GTM) strategy expert. Your task is to generate a complete GTM plan as a single, valid JSON object. Do not include any text outside of the JSON object.

    **User's Business Idea:**
    "{user_query}"

    **Context from similar companies (use this for inspiration):**
    ---
    {rag_context}
    ---

    **Your task is to generate a JSON object with the following structure:**
    - "personas": An array of 2-3 user persona objects. Each object should have "title", "demographics", "pain_points", and "goals".
    - "messaging": An object with keys like "google_ads" and "linkedin_post". "google_ads" should contain "headlines" (an array of strings) and a "description".
    - "channels": An array of 3 strings, each describing a suggested marketing channel.
    - "calendar": An array of 7 objects for a one-week content calendar. Each object should have "day", "activity", and "caption".
    - "budget_kpis": An object containing "lean_budget_proposal" (an array of strings for different phases) and "kpis" (an array of strings).
    - "competitors": An array of 3-5 strings, where each string is the name of a direct competitor.
    - "risk_analysis": An object with a "risk_score" (an integer from 1 to 10, where 10 is high risk) and a "justification" (a brief explanation for the score).
    
    Generate the JSON object now.
    """
    
    try:
        response = gemini_model.generate_content(prompt)
        
        clean_json_string = response.text.replace("```json", "").replace("```", "").strip()
        
        return json.loads(clean_json_string)
        
    except Exception as e:
        print(f"An error occurred with the Gemini API or JSON parsing: {e}")
        return {"error": "Failed to generate or parse the strategy plan."}