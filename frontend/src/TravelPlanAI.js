import { useState } from 'react';
import './styles/TravelPlanAI.css';

const TravelPlanAI = ( {openAiAns, userInfo} ) => {

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [isPending, setIsPending] = useState(false)

    const url = 'http://127.0.0.1:8080/clicked-save-ai-travel-plan'

    const handleClick = () => (e) => {
        e.preventDefault();
        setIsPending(true)
        const favDetailes = { openAiAns, userInfo }
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
