from flask import Flask, request
from flask_cors import CORS
import flight_data_fetcher
import open_ai_data_fetcher

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
    # input_data = 
    open_ai_answer = open_ai_data_fetcher.submite_query_to_open_ai(input_data)
    return open_ai_answer, 200




    json_response, status_code = flight_data_fetcher.handle_flight_request(input_data)
    if status_code != 200:
        return json_response, status_code
    return json_response, 200

if __name__ == '__main__':
    app.run(port=8080, debug=True)
    # input_to_delete = {'originLocationCode': 'TLV', 'destinationLocationCode': 'IST', 'departureDate': '2023-10-10', 'returnDate': '2023-10-13', 'adults': 1, 'max': 25, 'currencyCode': 'USD', 'nonStop': 'true'}
    # open_ai_data_fetcher.submite_query_to_open_ai(input_to_delete)
    

