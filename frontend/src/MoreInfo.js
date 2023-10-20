import { useState } from 'react';
import './styles/MoreInfo.css';

const MoreInfo = ({ flight, userInfo }) => {

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isPending, setIsPending] = useState(false)

  const url = 'http://127.0.0.1:8080/clicked-add-to-favorites'

  const handleClick = () => (e) => {
    e.preventDefault();
    setIsPending(true)
    const favDetailes = { flight, userInfo }
    fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favDetailes)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Problem adding to favorites");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess(true);
        setErrMsg(null)
        setIsPending(false)
      })
      .catch(err => {
        setErrMsg(err.message)

      })
  }
  return (
    <div className="more-info">
      <p>Flight {flight.carrier_code} {flight.flight_number}</p>
      <p>Departure from: {flight.origin}</p>
      <p>Destination: {flight.destination}</p>
      <p>Number of Passengers: {flight.num_people}</p>
      <p>Price: ${flight.price}</p>
      <p>Departure Date & Time: {flight.departure_date} {flight.departures_time}</p>
      <p>Return Date & Time: {flight.return_date} {flight.return_time}</p>
      {userInfo && !success && <button onClick={handleClick()}>Add to favorites</button>}
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      {isPending && !errMsg && <div>Loading...</div>}
      {success && <h3>Added to Favorites!</h3>}
    </div>
  );
}

export default MoreInfo;