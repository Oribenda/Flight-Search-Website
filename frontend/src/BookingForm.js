import { useState } from "react";
import './styles/BookingForm.css';

const BookingForm = (props) => {

    const randomList = ['NYC', 'AMS', 'ROM', 'IST', 'PAR', 'LON'];
    var randomIndex = Math.floor(Math.random() * randomList.length);
    var randomDestination = randomList[randomIndex];

    const [originLocationCode, setOriginLocationCode] = useState('TLV');
    const [destinationLocationCode, setDestinationLocationCode] = useState(randomDestination);
    const [departureDate, setDepartureDate] = useState('2023-10-10');
    const [returnDate, setReturnDate] = useState('2023-10-13');
    const [adults, setAdults] = useState(1);

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)

    const server_search_flight_url = 'http://127.0.0.1:8080/clicked-search-flight'
    const server_get_AI_travel_plan_url = 'http://127.0.0.1:8080/clicked-get-AI-travel-plan'

    const handleSearchClick = (e) => {
        e.preventDefault();
        setIsPending(true)
        const flightDetails = { originLocationCode, destinationLocationCode, departureDate, returnDate, adults }
        fetch(server_search_flight_url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flightDetails)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error('could not fetch the data');
                }
                setIsPending(false);
                setError(null);
                props.handleResponseError(null)
                return response.json();
            })
            .then((data) => {
                props.handleFlightResponseData(data.flights) // flights is a key word from the json file
                setIsPending(false)

            })
            .catch(err => {
                setIsPending(false);
                setError(err.message)
                props.handleResponseError(error)
            })
    }

    const handleAITravelPlanClick = (e) => {
        e.preventDefault();
        setIsPending(true)
        const flightDetails = { originLocationCode, destinationLocationCode, departureDate, returnDate, adults }
        fetch(server_get_AI_travel_plan_url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flightDetails)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error('could not fetch the data');
                }
                setIsPending(false);
                setError(null);
                props.handleResponseError(null)
                return response.json();
            })
            .then((data) => {
                props.handleOpenAiResponseData(data.answer) // answer is a key word from the json file
                setIsPending(false)
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message)
                props.handleResponseError(error)
            })
    }


    return (
        <div className="bookingForm">
            <h2>Enter Flight Details</h2>
            <form >
                <label>Origin:</label>
                <input
                    type="text"
                    required
                    value={originLocationCode}
                    onChange={(e) => setOriginLocationCode(e.target.value)}
                />
                <label>Destination:</label>
                <input
                    type="text"
                    required
                    value={destinationLocationCode}
                    onChange={(e) => setDestinationLocationCode(e.target.value)}
                />
                <label>Departure Date:</label>
                <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                />
                <label>Return Date:</label>
                <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                />
                <label>Passengers:</label>
                <input
                    type="number"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    min="1"
                    required
                />
                <button onClick={handleSearchClick} >Search Flight</button>
                <button onClick={handleAITravelPlanClick}>Get AI Travel Plan</button>
            </form>

            <div className="pending and errors">
                {isPending && <div>Loading...</div>}
                {Error && <div>{error}</div>}
            </div>
        </div>
    );
}

export default BookingForm;