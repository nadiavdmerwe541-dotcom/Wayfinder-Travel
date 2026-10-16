//global variable to storre our fetched data//
let travelData={}

//fetch the Jason file//
fetch('travel_recommendation_api.json')
    .then (response =>{
        console.log("Response status is:", response.status);
        console.log("Is response.ok?", response.ok);
        if (response.ok || response.status === 304){
            return response.json()
        } else {
            throw new Error('Network resposewas not ok');
        }
    })
    .then(data => {
        travelData = data;
        console.log("Data loaded successfully:", travelData);
    })
    .catch(error =>{
        console.error("Error fetching data:", error);
    });