import { useState } from "react";
import './styles/BookingForm.css';

const BookingForm = (props) => {

    const randomList = ['NYC', 'AMS', 'ROM', 'IST', 'PAR', 'LON'];
    var randomIndex = Math.floor(Math.random() * randomList.length);
    var randomDestination = randomList[randomIndex];

    const [originLocationCode, setOriginLocationCode] = useState('TLV');
    const [destinationLocationCode, setDestinationLocationCode] = useState(randomDestination);
    const [departureDate, setDepartureDate] = useState('2023-11-10');
    const [returnDate, setReturnDate] = useState('2023-11-13');
    const [adults, setAdults] = useState(1);

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)

    const server_search_flight_url = 'http://127.0.0.1:8080/clicked-search-flight'
    const server_get_AI_travel_plan_url = 'http://127.0.0.1:8080/clicked-get-AI-travel-plan'

    const handleClick = (isFromOpenAI) => (e) => {
        e.preventDefault();
        setIsPending(true)
        const url = (isFromOpenAI) ? server_get_AI_travel_plan_url : server_search_flight_url;
        const flightDetails = { originLocationCode, destinationLocationCode, departureDate, returnDate, adults }
        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flightDetails)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error('could not fetch the data');
                }
                setError(null);
                return response.json();
            })
            .then((data) => {
                (isFromOpenAI) ? props.handleOpenAiResponseData(data) : props.handleFlightResponseData(data);
                setIsPending(false)
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message)
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
                <button onClick={handleClick(false)} >Search Flight</button>
                <button onClick={handleClick(true)}>Get AI Travel Plan</button>
            </form>

            <div className="pending and errors">
                {isPending && !error && <div>Loading...</div>}
                {error && <div>{error}</div>}
            </div>
        </div >
    );
}
export default BookingForm;