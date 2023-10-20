import pymongo
from flask import jsonify
import json
from flask import jsonify


def sign_up(data):
    client, users_collection = mongo_db_collection_setup()
    username = data["username"]
    password = data["password"]

    # Check if the username already exists
    existing_user = users_collection.find_one({"username": username})
    if existing_user:
        return jsonify({"message": "Username already exists"}), 409

    # if user do not exists, add user
    new_user = {
        "username": username,
        "password": password,
        "favorite_flights": [],
        "saved_ai_recommendations": []
    }
    users_collection.insert_one(new_user)
    client.close()
    return jsonify({"message": "User registered successfully"}), 201


def log_in(data):
    client, users_collection = mongo_db_collection_setup()

    username = data["username"]
    password = data["password"]

    # Check if the username exists
    existing_user = users_collection.find_one({"username": username})
    if not existing_user:
        return jsonify({"message": "Username doesn't exists"}), 408
    if existing_user.get('password') != password:
        return jsonify({"message": "Wrong password"}), 409
    existing_user["_id"] = str(existing_user["_id"])
    json_data = {"userinfo": existing_user}
    user_json = json.dumps(json_data)
    client.close()
    return user_json, 200


def add_flight_to_favorites(data):
    client, users_collection = mongo_db_collection_setup()
    username = data.get("userInfo").get("username")
    flight = data.get("flight")
    existing_user = users_collection.find_one({"username": username})
    
    # Check if the username exists
    existing_user = users_collection.find_one({"username": username})
    if not existing_user:
        return jsonify({"message": "Username doesn't exists"}), 408

    new_id =len(existing_user.get("favorite_flights"))
    flight["id"] = new_id
    update_data = {"$push": {"favorite_flights": flight}}
    query = {"username": username}
    users_collection.update_one(query, update_data)
    client.close()
    return jsonify({"massage": "saved to favorites"}), 200


def save_open_ai_travel_plan(data):
    client, users_collection = mongo_db_collection_setup()
    open_ai_answer = data.get("openAiAns")
    username = data.get("userInfo").get("username")

    update_data = {"$push": {"saved_ai_recommendations": open_ai_answer}}

    # Check if the username exists
    existing_user = users_collection.find_one({"username": username})
    if not existing_user:
        return jsonify({"message": "Username doesn't exists"}), 408

    query = {"username": username}
    users_collection.update_one(query, update_data)
    client.close()
    return jsonify({"massage": "saved to favorites"}), 200


def mongo_db_collection_setup():
    connection_string = "mongodb+srv://ori8000:ori8000@cluster0.0prwfpf.mongodb.net/?retryWrites=true&w=majority"
    db_name = "userInfoDB"
    collection_name = "users"
    client = pymongo.MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    return client, collection
