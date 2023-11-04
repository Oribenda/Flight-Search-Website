import os

def get_api_key(env_var_name):
    api_key = os.environ.get(env_var_name)
    if api_key is None:
        api_key = ""
    return api_key

open_ai_key = get_api_key("OPEN_AI_KEY")
mongo_db_key = get_api_key("MONGO_DB_KEY")
amadeus_api_key = get_api_key("AMADEUS_API_KEY")





