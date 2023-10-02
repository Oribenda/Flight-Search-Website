import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import './styles/MoreInfo.css';

const MoreInfo = (props) => {
  const flight = props.flight

  return (
    <div className="more-info">
      <p>Flight {flight.carrier_code} {flight.flight_number}</p>
      <p>Departure from: {flight.origin}</p>
      <p>Destination: {flight.destination}</p>
      <p>Number of Passengers: {flight.num_people}</p>
      <p>Price: ${flight.price}</p>
      <p>Departure Date & Time: {flight.departure_date} {flight.departures_time}</p>
      <p>Return Date & Time: {flight.return_date} {flight.return_time}</p>
      <button>Add to favorites</button>
    </div>
  );
}

export default MoreInfo;