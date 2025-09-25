# src/rag_retriever.py
import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from pathlib import Path
import yaml

# Load configuration
config = yaml.safe_load(Path("config.yaml").read_text(encoding="utf-8"))

# Load models and data
model = SentenceTransformer(config['models']['embedding'])
index = faiss.read_index(config['paths']['faiss_index'])
with open(config['paths']['docstore'], 'r', encoding='utf-8') as f:
    docstore = json.load(f)

def retrieve_context(query: str, top_k: int) -> str:
    """
    Retrieves the most relevant text chunks from the docstore.
    """
    q_embedding = model.encode([query], normalize_embeddings=True).astype(np.float32)
    _, idxs = index.search(q_embedding, top_k)
    
    # Get the text content for the retrieved indices
    results = [docstore["texts"][i] for i in idxs[0]]
    
    # Join the results into a single context string
    context = "\n\n---\n\n".join(results)
    return context