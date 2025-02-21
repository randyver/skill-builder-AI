from flask import request, jsonify, Blueprint
from flask_cors import CORS
import pandas as pd
import os
from .utils.model_loader import load_model, load_label_encoder

script_dir = os.path.dirname(__file__)
model_path = os.path.join(script_dir, 'field_model', 'field_prediction_model.pkl')
le_path = os.path.join(script_dir, 'field_model', 'label_encoder_field_prediction.pkl')

field_prediction_bp = Blueprint('field_prediction', __name__)
CORS(field_prediction_bp, origins=['http://localhost:3000'])
model = load_model(model_path=model_path)
le = load_label_encoder(le_path=le_path)

@field_prediction_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Convert JSON data to DataFrame
    data_df = pd.DataFrame(data, index=[0])
    # Predict and convert to original label
    prediction_encoded = model.predict(data_df)
    prediction_label = le.inverse_transform(prediction_encoded)

    label_mapping = {
        'CodingSkill': 'Coding Skill',
        'WebDev': 'Web Development',
        'GameDev': 'Game Development',
        'CyberSecurity': 'Cyber Security',
        'DataScience': 'Data Science',
        'MobileDev': 'Mobile Development',
        'ProductManager': 'Product Manager',
        'UIUX': 'UI/UX',
        'SoftEng': 'Software Engineering',
    }

    print(prediction_label) 

    final_predict = label_mapping.get(prediction_label[0], prediction_label[0])
    return jsonify({'Prediction': final_predict})

def create_app():
    return field_prediction_bp