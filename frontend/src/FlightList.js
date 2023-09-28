import './styles/FlightList.css'

const FlightList = ({ flights }) => {
    return ( 
        <div className="flight-list">
            {flights.map(flight => (
                <div className="flight-preview" key={flight.id}>
                    <h2>{flight.flight_number}</h2>
                </div>
            ))}
        </div>
     );
}
 
export default FlightList;