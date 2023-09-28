import { useState } from "react";
import './styles/BookingForm.css';
import FlightList from "./FlightList";

const BookingForm = () => {

    const [origin, setOrigin] = useState('ORI');
    const [destination, setDestination] = useState('BEN DAVID');
    const [departureDate, setDepartureDate] = useState('2000-02-20');
    const [returnDate, setReturnDate] = useState('2000-02-20');
    const [passengers, setPassengers] = useState(1);

    const [Error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)
    const [flights, setflights] = useState(null);
    const url = 'http://127.0.0.1:8080/submited'

    const handleSubmit = (e) => {
        e.preventDefault();
        const flight = { origin, destination, departureDate, returnDate, passengers }
        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flight)
        })
        .then((response) => {
            if (!response.ok) {
                throw Error('could not fetch the data for that resource');
            }
            // setOutputString(response.json());
            setIsPending(false);
            setError(null);
            return response.json();
        })
        .then((data) => {
            setflights(data.flights)
        })
        .catch(err => {
            console.log("error")
            setIsPending(false);
            setError(err.message)
        })
    }
    return (
        <div className="bookingForm">
            <h2>Enter Flight Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Origin:</label>
                <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                />
                <label>Destination:</label>
                <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
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
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    min="1"
                    required
                />
                <button>Search Flight</button>
            </form>

            <div className="flight-details">
                {isPending && <div>Loading...</div>}
                {Error && <div>{Error}</div>}
                {flights && flights.length > 0 && <FlightList flights={flights}/>}
            </div>

        </div>


    );
}

export default BookingForm;