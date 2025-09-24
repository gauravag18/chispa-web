# src/embed_and_index.py
import json, numpy as np
from pathlib import Path
from sentence_transformers import SentenceTransformer
import faiss

INP = Path("data/processed/rag_documents.jsonl")
EMB_NPY = Path("data/processed/embeddings.npy")
INDEX_BIN = Path("data/processed/faiss.index")
DOCSTORE = Path("data/processed/docstore.json")

model = SentenceTransformer("all-MiniLM-L6-v2")

texts, metas = [], []
with open(INP, encoding="utf-8") as f:
    for line in f:
        d = json.loads(line)
        texts.append(d["text"])
        metas.append({"id": d["id"], "section": d["section"], "startup_name": d["startup_name"], "industry": d["industry"]})

emb = model.encode(texts, batch_size=64, show_progress_bar=True, normalize_embeddings=True)
np.save(EMB_NPY, emb)

index = faiss.IndexFlatIP(emb.shape[1])  # cosine via normalized dot product
index.add(emb.astype(np.float32))
faiss.write_index(index, str(INDEX_BIN))

with open(DOCSTORE, "w", encoding="utf-8") as f:
    json.dump({"texts": texts, "metas": metas}, f, ensure_ascii=False)

print("Built FAISS index with MiniLM embeddings")
