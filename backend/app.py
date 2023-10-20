from flask import Flask, request
from flask_cors import CORS
import flight_data_fetcher
import open_ai_data_fetcher
import user_db_connection

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "The Backend Server is runing!"


@app.route('/clicked-search-flight', methods=['POST'])
def search_flight_clicked():
    input_data = request.get_json()
    json_response, status_code = flight_data_fetcher.handle_flight_request(input_data)
    if status_code != 200:
        return json_response, status_code
    return json_response, 200


@app.route('/clicked-get-AI-travel-plan', methods=['POST'])
def get_AI_travel_plan_clicked():
    input_data = request.get_json()
    open_ai_answer = open_ai_data_fetcher.submite_query_to_open_ai(input_data)
    return open_ai_answer, 200


@app.route('/clicked-log-in', methods=['POST'])
def log_in():
    input_data = request.get_json()
    json_response, status_code = user_db_connection.log_in(input_data)
    return json_response, status_code


@app.route('/clicked-sign-up', methods=['POST'])
def sign_up():
    input_data = request.get_json()
    json_response, status_code = user_db_connection.sign_up(input_data)
    return json_response, status_code


@app.route('/clicked-add-to-favorites', methods=['POST'])
def add_flight_to_favorites():
    input_data = request.get_json()
    json_response, status_code = user_db_connection.add_flight_to_favorites(input_data)
    return json_response, status_code


@app.route('/clicked-save-ai-travel-plan', methods=['POST'])
def save_ai_travel_plan():
    input_data = request.get_json()
    json_response, status_code = user_db_connection.save_open_ai_travel_plan(input_data)
    return json_response, status_code



if __name__ == '__main__':    
    app.run(port=8080, debug=True)