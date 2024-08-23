import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier 
from sklearn.preprocessing import LabelEncoder
import joblib


# Load the data
def load_data(path: str):
    data = pd.read_csv(path)
    return data

def split_data(data: pd.DataFrame):
    X = data.drop(columns=['Skill_to_Improve_First'])
    y = data['Skill_to_Improve_First']
    le = LabelEncoder()
    y = le.fit_transform(y)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state= 42)
    return X_train, X_test, y_train, y_test

def train_model(X_train: pd.DataFrame, y_train: pd.Series):
    model = GradientBoostingClassifier()
    model.fit(X_train, y_train)
    return model

def evaluate_model(model, X_test: pd.DataFrame, y_test: pd.Series):
    score = model.score(X_test, y_test)
    return score

def save_model(model, path: str):
    joblib.dump(model, 'model.pkl')    

if __name__ == '__main__':
    data = load_data('data.csv')
    X_train, X_test, y_train, y_test = split_data(data)
    model = train_model(X_train, y_train)
    score = evaluate_model(model, X_test, y_test)
    print(f'Model score: {score}')
    save_model(model, 'model.pkl')