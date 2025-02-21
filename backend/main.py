
from model.field_prediction import create_app as create_field_prediction_app
from flask import Flask

main_app = Flask(__name__)
main_app.register_blueprint(create_field_prediction_app(), url_prefix='/field-prediction')

if __name__ == '__main__':
    main_app.run(port=5000)