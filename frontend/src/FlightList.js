import './styles/FlightList.css'
import { useState } from 'react';
import MoreInfo from './MoreInfo';



const FlightList = ({ flights }) => {

    const [selectedFlightID, setSelectedFlightID] = useState(null);

    const handleMoreInfoClick = (flight) => {
        if (selectedFlightID && selectedFlightID === flight.id) {
            setSelectedFlightID(null);
        } else {
            setSelectedFlightID(flight.id);
        }
    };


    return (
        <div className="flight-list">
            {flights.map(flight => (
                <div className="flight-card" key={flight.id}>
                    <div className="flight-info">
                        <div className="carrier-logo">
                            <img
                                src={`./logos/${flight.carrier_code}.png`}
                                alt={`Logo for ${flight.carrier_code}`}
                                onError={(e) => {
                                    // Handle error when logo is not found (e.g., use the default logo)
                                    e.target.src = `./logos/default.png`;
                                }}
                            />
                        </div>
                        <div className="flight-details">
                            <p className="flight-number">
                                Flight {flight.carrier_code} {flight.flight_number}
                            </p>
                            <p className="origin-destination">
                                {flight.departure_date} {flight.departure_time} - {flight.return_date} {flight.return_time}
                            </p>
                        </div>
                        <div className="flight-price">
                            <p>${flight.price}</p>
                        </div>
                    </div>

                    <div className="button-container">
                        <button className="action-button"
                            onClick={() => {
                                handleMoreInfoClick(flight);
                            }}>
                            {(selectedFlightID && selectedFlightID == flight.id)
                                ? "Hide Info"
                                : "More Info"}
                        </button>
                    </div>
                    {selectedFlightID && selectedFlightID == flight.id && (
                        <MoreInfo flight={flight} />
                    )}
                </div>

            ))}
        </div>
    );
}

export default FlightList;