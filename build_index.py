# build_index.py
import pandas as pd
import numpy as np
import faiss
import json
from sentence_transformers import SentenceTransformer
import yaml
from pathlib import Path

print("Loading configuration...")
config = yaml.safe_load(Path("config.yaml").read_text(encoding="utf-8"))

# Configuration Paths
SOURCE_CSV = Path(config['paths']['source_csv'])
INDEX_PATH = Path(config['paths']['faiss_index'])
DOCSTORE_PATH = Path(config['paths']['docstore'])

# Ensure output directories exist
INDEX_PATH.parent.mkdir(parents=True, exist_ok=True)
DOCSTORE_PATH.parent.mkdir(parents=True, exist_ok=True)

# Load the embedding model
print("Loading embedding model...")
model = SentenceTransformer(config['models']['embedding'])

# Read the source CSV
print(f"Reading source data from {SOURCE_CSV}...")
df = pd.read_csv(SOURCE_CSV)

# Create a combined text for embedding
df['combined_text'] = df.apply(lambda row: f"Opportunity: {row['The Startup & The Opportunity']} Strategy: {row['Go-to-Market Strategy']} Results: {row['Results & Key Learnings']}", axis=1)

# Generate embeddings
print("Generating embeddings for all documents...")
embeddings = model.encode(df['combined_text'].tolist(), normalize_embeddings=True, show_progress_bar=True).astype(np.float32)

# Build the FAISS index
print("Building FAISS index...")
index = faiss.IndexFlatIP(embeddings.shape[1])
index.add(embeddings)
faiss.write_index(index, str(INDEX_PATH))
print(f"FAISS index saved to {INDEX_PATH}")

# Create and save the docstore
print("Creating and saving docstore...")
docstore = {
    "texts": df['combined_text'].tolist(),
    "metas": df.to_dict(orient='records') # Store original rows as metadata
}
with open(DOCSTORE_PATH, 'w', encoding='utf-8') as f:
    json.dump(docstore, f)
print(f"Docstore saved to {DOCSTORE_PATH}")
print("\nIndexing complete!")