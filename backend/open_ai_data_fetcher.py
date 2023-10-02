import openai
import json
from city_dict import city_dictionary



def generate_prompt(departure_date, return_date, destination, interests):
    prompt2 = f"Create a schedule with recommended activities for my trip from {departure_date} to the {return_date} in {destination}"
    prompt = f"Create a daily itinerary for my trip to {destination} from {departure_date} to {return_date}. Please provide recommendations for morning, afternoon, and evening activities for each day of the trip, ensuring that each line does not exceed 100 characters in length. Please ensure line breaks for better formatting on the screen."
    if interests:
        prompt += " I'm interested in: "
        for i in interests:
            prompt += i + ", "
        prompt = prompt[:-2] + "."
    print(prompt) #DELETE
    return prompt


def submite_query_to_open_ai(params):
    openai.api_key = "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"
    # openai.api_key = "sk-9Ya8ecu6HEhkFJ8M8nN3DLtixzZRleXeCc"

    departure_date = params.get("departureDate")
    return_date = params.get("returnDate")
    city_name = city_dictionary.get(params.get("destinationLocationCode"))

    interests = ["exploring the culture", "visiting historical sites",
                                          "experiencing the local cuisine"]
    interests = None
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=generate_prompt(
                departure_date, return_date, city_name, interests),
            max_tokens=3000
        )
        open_ai_answer = response['choices'][0]['text']

    except:
        open_ai_answer = "Problem connecting to Open AI"

    finally:
        print(open_ai_answer) # DELETE
        json_data = {"answer": open_ai_answer}
        ans_json = json.dumps(json_data)
        return ans_json
