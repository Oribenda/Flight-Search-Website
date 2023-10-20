import BookingForm from "./BookingForm";
import FlightList from "./FlightList";
import { useState } from "react";
import TravelPlanAI from "./TravelPlanAI";

import './styles/Home.css';

const Home = ({ userInfo }) => {
  const [flights, setFlights] = useState(null);
  const [openAiAns, setOpenAiAns] = useState(null);

  const handleFlightResponseData = (dataFromResponse) => {
    setFlights(dataFromResponse.flights) // 'flight is a key word from the json file
    setOpenAiAns(null)
  };

  const handleOpenAiResponseData = (dataFromAIResponse) => {
    setOpenAiAns(dataFromAIResponse.answer) // 'answer is a key word from the json file
    setFlights(null)
  };

  return (
    <div className="home">
      {userInfo && <div className="welcome">Welcome {userInfo.username},</div>}
      <BookingForm handleFlightResponseData={handleFlightResponseData} handleOpenAiResponseData={handleOpenAiResponseData} />
      {openAiAns && !flights && <TravelPlanAI openAiAns={openAiAns} userInfo={userInfo}/>}
      {flights && !openAiAns && <FlightList flights={flights} userInfo={userInfo} />}
    </div>
  );
}
export default Home;
