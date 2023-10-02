import './styles/TravelPlanAI.css';

const TravelPlanAI = ( {openAiAns} ) => {
    return (  
        <div className="text-container">
            <pre>{openAiAns}</pre>
        </div>
    );
}
 
export default TravelPlanAI;
