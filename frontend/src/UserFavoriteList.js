import { useState, useEffect } from 'react';
import FlightList from "./FlightList";
import TravelPlanAI from "./TravelPlanAI";
import { server_log_in_url } from './flaskServerURLs';


const UserFavoriteList = ({ userInfo }) => {
    const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo);

    const [errMsg, setErrMsg] = useState('');
    const [isPending, setIsPending] = useState(true)

    const refreshUserInfo = () => {
        setIsPending(true)
        const username = userInfo.username;
        const password = userInfo.password;
        const loginDetails = { username, password }
        fetch(server_log_in_url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDetails)
        })
            .then((response) => {

                if (response.status === 408) {
                    throw Error('Wrong username');
                }
                else if (response.status === 409) {
                    throw Error('Wrong password');
                }
                else if (!response.ok) {
                    throw Error('could not fetch the data');
                }
                return response.json();
            })
            .then((data) => {
                setUpdatedUserInfo(data)
                setIsPending(false)
            })
            .catch(err => {
                setErrMsg(err.message)
            })
    }

    useEffect(() => {
        // This function will be called when the component is initially rendered.
        if (userInfo !== null) {
            refreshUserInfo();
        }
    }, []);

    return (
        <div>
            {isPending ? (<div>Loading...</div>) :
                (
                    <div>
                        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                        {updatedUserInfo.userinfo.favorite_flights.length !==0 ? (<h1>Favorite flights:</h1>) : (<h3>No favorite flights saved</h3>)}
                        {updatedUserInfo.userinfo.favorite_flights.length !== 0 && <FlightList flights={updatedUserInfo.userinfo.favorite_flights} />}
                        {updatedUserInfo.userinfo.saved_ai_recommendations.length !==0 ? (<h1>Saved AI Travel Plan:</h1>) : (<h3>No AI Travel Plan Saved</h3>)}
                        {updatedUserInfo.userinfo.saved_ai_recommendations.length !== 0 && <TravelPlanAI openAiAns={updatedUserInfo.userinfo.saved_ai_recommendations} />}
                    </div>
                )}
        </div>
    );
}
export default UserFavoriteList;