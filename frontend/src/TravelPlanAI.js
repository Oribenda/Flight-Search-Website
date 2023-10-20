import { useState } from 'react';
import { server_save_ai_travel_plan_url } from './flaskServerURLs';
import './styles/TravelPlanAI.css';

const TravelPlanAI = ( {openAiAns, userInfo} ) => {

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [isPending, setIsPending] = useState(false)

    const handleClick = () => (e) => {
        e.preventDefault();
        setIsPending(true)
        const favDetailes = { openAiAns, userInfo }
        fetch(server_save_ai_travel_plan_url, {
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
        <div className="text-container">
            <pre>{openAiAns}</pre>
            {userInfo && !success && <button onClick={handleClick()}>Add to favorites</button>}
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            {isPending && !errMsg && <div>Loading...</div>}
            {success && <h3>Added to Favorites!</h3>}
        </div>
    );
}
 
export default TravelPlanAI;
