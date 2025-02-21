import joblib

def load_model(model_path):
    return joblib.load(model_path)

def load_label_encoder(le_path):
    return joblib.load(le_path)