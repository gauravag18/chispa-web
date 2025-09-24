# src/rag_prepare.py
import csv, json, re, os, hashlib
from pathlib import Path

RAW = Path("data/raw/corpus.csv")
OUT_DIR = Path("data/processed")
OUT_DIR.mkdir(parents=True, exist_ok=True)
DOCS_JSONL = OUT_DIR / "rag_documents.jsonl"

def normalize_text(t: str) -> str:
    t = t.replace("\u2019", "'").replace("\u2013", "-").replace("\u2014", "-")
    t = re.sub(r"\s+", " ", t).strip()
    return t

def infer_name_and_industry(opportunity: str):
    # naïve heuristics
    name_match = re.match(r"([A-Z][A-Za-z0-9]+)", opportunity.strip())
    name = name_match.group(1) if name_match else "Unknown"
    industry = "FoodTech" if "food" in opportunity.lower() else \
               "Logistics SaaS" if "route" in opportunity.lower() else \
               "HealthTech" if "skin" in opportunity.lower() else "General"
    return name, industry

def chunk(text: str, max_chars=900):
    text = normalize_text(text)
    parts, buf = [], []
    for sent in re.split(r"(?<=[.!?])\\s+", text):
        if sum(len(s) for s in buf) + len(sent) + 1 <= max_chars:
            buf.append(sent)
        else:
            if buf: parts.append(" ".join(buf)); buf = [sent]
    if buf: parts.append(" ".join(buf))
    return [p for p in parts if p]

def row_to_docs(row, row_id):
    opp = normalize_text(row["The Startup & The Opportunity"])
    strat = normalize_text(row["Go-to-Market Strategy"])
    learn = normalize_text(row["Results & Key Learnings"])
    name, industry = infer_name_and_industry(opp)
    base_meta = {"startup_name": name, "industry": industry, "source": "corpus.csv"}
    docs = []
    for section, text in [("opportunity", opp), ("strategy", strat), ("learnings", learn)]:
        for i, ch in enumerate(chunk(text)):
            doc_id = f"{name.lower()}-{section}-{row_id}-{i}"
            docs.append({"id": doc_id, "section": section, "text": ch, **base_meta})
    return docs

def main():
    with open(RAW, newline="", encoding="utf-8") as f, open(DOCS_JSONL, "w", encoding="utf-8") as out:
        reader = csv.DictReader(f)
        rid = 0
        seen = set()
        for row in reader:
            for d in row_to_docs(row, rid):
                h = hashlib.md5(d["text"].encode("utf-8")).hexdigest()
                if h in seen: continue
                seen.add(h)
                out.write(json.dumps(d, ensure_ascii=False) + "\n")
            rid += 1
    print(f"Wrote {DOCS_JSONL}")

if __name__ == "__main__":
    main()
