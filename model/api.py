from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd 

skills= ['Coding Skill', 'Web Development', 'Game Development', 'Cyber Security', 'Data Science', 'Mobile Development', 'Product Manager', 'UI/UX', 'Software Engineering']

app= Flask(__name__)   
CORS(app)

model= joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data= request.get_json()
    prediction= model.predict(pd.DataFrame(data, index=[0]))
    return jsonify({'Prediction': skills[prediction[0]]})

if __name__ == '__main__':
    app.run(port=5000)