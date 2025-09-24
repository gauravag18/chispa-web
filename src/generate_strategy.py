# src/generate_strategy.py
from transformers import pipeline
from .rag_retriever import retrieve_context
from .multimodal_processor import process_input
from .agent_optimizer import optimize
import yaml
from pathlib import Path

_cfg = yaml.safe_load(Path("config.yaml").read_text(encoding="utf-8"))
MODEL_PATH = _cfg.get("model_path", "Dhairyaa/Fine-tuned-bart-model-for-marketing-strategies")

generator = pipeline("summarization", model=MODEL_PATH)

def _gen(aug_prompt: str, instruction: str) -> str:
    text = f"{aug_prompt}\n\nTask: {instruction}"
    return generator(text, max_length=512, truncation=True)[0]["summary_text"]

def generate_dashboard(input_json: dict) -> dict:
    query = process_input(input_json)
    aug_prompt = retrieve_context(query, top_k=_cfg.get("rag_top_k", 3))
    return {
        "personas": _gen(optimize(aug_prompt, "personas"), "Generate 2–3 personas with demographics, pains, and goals."),
        "messaging": _gen(optimize(aug_prompt, "messaging"), "Write Google Ads, LinkedIn posts, and tweets aligned to personas."),
        "channels": _gen(optimize(aug_prompt, "channels"), "Rank channels with 1–2 line justifications."),
        "calendar": _gen(optimize(aug_prompt, "calendar"), "Outline a 30‑day content calendar with daily posts."),
        "budget_kpis": _gen(optimize(aug_prompt, "budget_kpis"), "Propose lean vs growth budgets with suggested KPIs."),
    }

def regenerate_for_tab(tab: str, prompt: str) -> str:
    # Allow UI to pass a focused prompt; still run through generator
    return generator(prompt, max_length=512, truncation=True)[0]["summary_text"]
