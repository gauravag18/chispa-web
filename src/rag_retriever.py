# src/rag_retriever.py
import json, numpy as np, faiss
from sentence_transformers import SentenceTransformer
from pathlib import Path

INDEX_BIN = Path("data/processed/faiss.index")
DOCSTORE = Path("data/processed/docstore.json")
model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index(str(INDEX_BIN))
docstore = json.loads(Path(DOCSTORE).read_text(encoding="utf-8"))

def retrieve_augmented_prompt(query: str, top_k: int = 4, section_filter=None):
    q = model.encode([query], normalize_embeddings=True).astype(np.float32)
    scores, idxs = index.search(q, top_k)
    results = []
    for i in idxs[0]:
        meta = docstore["metas"][i]
        if section_filter and meta["section"] not in section_filter:
            continue
        results.append({"text": docstore["texts"][i], "meta": meta})
    context = "\n\n".join([f"[{r['meta']['startup_name']}:{r['meta']['section']}] {r['text']}" for r in results])
    aug = f"Context:\n{context}\n\nInstruction: Using the context, answer the user’s request precisely."
    return aug, results
