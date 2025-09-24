from transformers import pipeline
from rag_retriever import retrieve
from agent_optimizer import optimize

generator = pipeline('summarization', model='Dhairyaa/Fine-tuned-bart-model-for-marketing-strategies')

def generate_dashboard(input_json):
    query = process_input(input_json)
    docs = retrieve(query)
    aug_prompt = query + " " + " ".join(docs)
    
    outputs = {}
    outputs['personas'] = generator(optimize(aug_prompt + " Generate 2-3 personas", "personas"))[0]['summary_text']
    
    outputs['messaging'] = generator(optimize(aug_prompt + " Generate ad copy for Google, LinkedIn, Twitter", "messaging"))[0]['summary_text']
    
    outputs['channels'] = generator(optimize(aug_prompt + " Rank channels with justifications", "channels"))[0]['summary_text']
    
    outputs['calendar'] = generator(optimize(aug_prompt + " Create 30-day calendar", "calendar"))[0]['summary_text']  # Export via API
    
    outputs['budget_kpis'] = generator(optimize(aug_prompt + " Project budgets and KPIs", "budget_kpis"))[0]['summary_text']
    
    return outputs  # JSON for web
