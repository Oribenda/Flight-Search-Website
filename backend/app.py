from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
print("ewfewf")
@app.route('/',methods=['GET'])
def home():
    print("EWfwefw")
    json_file = {
                    "blogs": [
                        {
                        "title": "My First Blog",
                        "body": "Why do we use it?\nIt is teristic words etc.",
                        "author": "mario",
                        "id": 1
                        },
                        {
                        "title": "Opening Party!",
                        "body": "Why do we use it?\nIt is a long establish.",
                        "author": "yoshi",
                        "id": 2
                        }
                    ]
                    }
    return jsonify(json_file)


@app.route('/submited', methods=['POST'])
def receive_submition():
    data = request.get_json()
    # Do something with the JSON data
    # ...

    # Return a JSON response with a 200 status code
    print(data.get('origin'))
    flights_json = {
                    "flights": [
                        {
                        "flight_number": "AA123",
                        "airline": "American Airlines",
                        "departure_airport": "JFK International Airport",
                        "departure_time": "2023-09-28T08:00:00",
                        "destination_airport": "Los Angeles International Airport",
                        "arrival_time": "2023-09-28T12:30:00",
                        "ticket_price": 350.50,
                        "id":1
                        },
                        {
                        "flight_number": "DL456",
                        "airline": "Delta Air Lines",
                        "departure_airport": "Hartsfield-Jackson Atlanta International Airport",
                        "departure_time": "2023-09-28T10:30:00",
                        "destination_airport": "San Francisco International Airport",
                        "arrival_time": "2023-09-28T14:45:00",
                        "ticket_price": 420.75,
                        "id":2
                        }
                    ]
                    }

    return flights_json, 200



if __name__ == '__main__':
    app.run(port=8080,debug=True)
