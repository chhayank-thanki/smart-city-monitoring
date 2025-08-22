from transformers import BertForSequenceClassification, BertTokenizer
import torch

MODEL_NAME = "AventIQ-AI/Bert-Disaster-SOS-Message-Classifier"

# Load model & tokenizer
tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)
model = BertForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()  # Set to eval mode

# Optional: use GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def predict_alert_type(text: str):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=128)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    
    with torch.no_grad():
        outputs = model(**inputs)
    
    logits = outputs.logits
    pred_id = torch.argmax(logits, dim=1).item()
    # Map [0,1,2] to actual label strings if needed
    labels = model.config.id2label
    return labels.get(pred_id, str(pred_id)), torch.softmax(logits, dim=1).max().item()
