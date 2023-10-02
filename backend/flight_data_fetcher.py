from cachetools import TTLCache
import requests
import json
from flask import jsonify
import datetime


cache = TTLCache(ttl=1799, maxsize=1)


# given
def get_headers():
    if "key" in cache:
        return cache["key"]

    url = "https://test.api.amadeus.com/v1/security/oauth2/token?grant_type=client_credentials"
    payload = 'grant_type=client_credentials&client_id=Uw0y2n32YHnislVUb7jDH9XptwMTsSY3&client_secret=DLBF2A4b2Vr1n6Af'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    token = response.json()["access_token"]
    cache["key"] = {"Authorization": "Bearer {}".format(token)}
    return {"Authorization": "Bearer {}".format(token)}


def handle_flight_request(input_params):
    json_response, status_code = fetch_data_from_amadeus(input_params)
    if status_code != 200:
        return json_response, status_code

    # else - the request worked! we got our flight list from amadeus web site
    messy_flight_list = json_response
    flight_list = create_clean_flight_list(messy_flight_list, input_params)
    json_data = {"flights": flight_list}
    flights_json = json.dumps(json_data)
    return flights_json, status_code


def fetch_data_from_amadeus(params):
    amadeus_url = "https://test.api.amadeus.com/v2/shopping/flight-offers"
    additional_params = {"max": 25,
                         "currencyCode": "USD",
                         "nonStop": "true"}
    params.update(additional_params)
    print(params)

    response = requests.get(amadeus_url, params=params,
                            headers=get_headers(), timeout=10)
    json_response = response.json()
    if not response.ok:
        error_message = "Failed to connect to amadeus server"
        return jsonify({"error": error_message}), response.status_code

    messy_flight_list = json_response["data"]
    return messy_flight_list, response.status_code


def create_clean_flight_list(messy_flight_list, data):
    flight_list = []
    for messy_flight in messy_flight_list:
        flight = {}

        flight["origin"] = data["originLocationCode"]
        flight["destination"] = data["destinationLocationCode"]
        flight["num_people"] = data["adults"]

        flight["id"] = messy_flight["id"]
        flight["price"] = messy_flight["price"]["total"]
        flight["departure_date"], flight["departures_time"] = get_flight_date_time(
            messy_flight, isOrigin=True)
        flight["return_date"], flight["return_time"] = get_flight_date_time(
            messy_flight, isOrigin=False)
        flight["carrier_code"] = messy_flight['itineraries'][0]['segments'][0]['carrierCode']
        flight["flight_number"] = messy_flight['itineraries'][0]['segments'][0]['number']

        flight["number_of_stops_outgoing"] = messy_flight["itineraries"][0]['segments'][0]['numberOfStops']
        flight["number_of_stops_returning"] = messy_flight["itineraries"][1]['segments'][0]['numberOfStops']

        flight_list.append(flight)
    return flight_list


def get_flight_date_time(messy_flight, isOrigin=True):
    isOriginNum = 0 if isOrigin else 1
    departure_datetime_str = messy_flight['itineraries'][isOriginNum]['segments'][0]['departure']['at']
    departure_datetime = (
        datetime.datetime.fromisoformat(departure_datetime_str))

    arrival_datetime_str = messy_flight['itineraries'][isOriginNum]['segments'][0]['arrival']['at']
    arrival_datetime = (datetime.datetime.fromisoformat(arrival_datetime_str))

    hours = (
        f"{departure_datetime.strftime('%H:%M')}-{arrival_datetime.strftime('%H:%M')}")
    date = (departure_datetime.strftime("%Y-%m-%d"))

    return (date, hours)
