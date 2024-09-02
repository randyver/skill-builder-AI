from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd 

app= Flask(__name__)   
CORS(app)

model = joblib.load('./model/model.pkl')
le = joblib.load('./model/label_encoder.pkl')  # Muat LabelEncoder

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Convert JSON data to DataFrame
    data_df = pd.DataFrame(data, index=[0])
    # Predict and convert to original label
    prediction_encoded = model.predict(data_df)
    prediction_label = le.inverse_transform(prediction_encoded)
    if prediction_label[0] == 'CodingSkill':
        prediction_label[0] = 'Coding Skill'
    
    elif prediction_label[0] == 'WebDev':
        prediction_label[0] = 'Web Development'
    
    elif prediction_label[0] == 'GameDev':
        prediction_label[0] = 'Game Development'
    
    elif prediction_label[0] == 'CyberSecurity':
        prediction_label[0] = 'Cyber Security'
    
    elif prediction_label[0] == 'DataScience':
        prediction_label[0] = 'Data Science'
    
    elif prediction_label[0] == 'MobileDev':
        prediction_label[0] = 'Mobile Development'
    
    elif prediction_label[0] == 'ProductManager':
        prediction_label[0] = 'Product Manager'
    
    elif prediction_label[0] == 'UIUX':
        prediction_label[0] = 'UI/UX'

    elif prediction_label[0] == 'SoftEng':
        prediction_label[0] = 'Software Engineering'

    return jsonify({'Prediction': prediction_label[0]})

if __name__ == '__main__':
    app.run(port=5000)