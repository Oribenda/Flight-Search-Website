import BookingForm from "./BookingForm";
import FlightList from "./FlightList";
import { useState } from "react";
import TravelPlanAI from "./TravelPlanAI";

const Home = () => {
  const [flights, setFlights] = useState(null);
  const [openAiAns, setOpenAiAns] =useState(null);
  const [error, setError] =useState(null);
  
  const handleFlightResponseData = (dataFromResponse) => {
    setFlights(dataFromResponse)
    setOpenAiAns(null)
  };

  const handleOpenAiResponseData =(dataFromAIResponse) => {
    setOpenAiAns(dataFromAIResponse)
    setFlights(null)
  };

  const handleResponseError = (errorFromResponse) => {
    setError(errorFromResponse)
  };

  return (
    <div className="home">
      <BookingForm handleFlightResponseData={handleFlightResponseData} handleOpenAiResponseData={handleOpenAiResponseData} handleResponseError={handleResponseError} />
      {openAiAns &&! flights && <TravelPlanAI openAiAns={openAiAns}/>}
      {flights && !openAiAns && !error && <FlightList flights={flights}/>}
      

    </div>
  );
}
 
export default Home;
