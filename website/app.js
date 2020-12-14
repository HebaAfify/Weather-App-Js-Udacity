
/* Global Variables */
const apiKey = '&appid=cb7576b4ec2cc549727e7aa031e35665&units=metric';
const zipCode = document.getElementById('zip');
const url ='http://api.openweathermap.org/data/2.5/weather?zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//add eventlistner in generate button to call all other functions
document.getElementById('generate').addEventListener('click', submit);

function submit(){
    const code = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getData(url, code, apiKey)
    .then(function (data){
        // Add data to POST request
        postData('http://localhost:5500/weatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
        //update UI
        .then(function() {
            updateUI()
        })
    })
}

const getData = async (url, code, apiKey)=>{
        const response = await fetch(url + code + apiKey)
        console.log(response);
        try {
            const data = await response.json();
            console.log(data);
            return data;
        }
        catch(error) {
            console.log('error');
        }
    }

const postData = async (url = "", data = {}) =>{
    //code to fetch server url and method, credentials, headers and body
    const post = await fetch (url, {
        "method" : "POST",
        "credentials" : "same-origin",
        "headers" : {"Content-Type" : "application/json"},
        "body" : JSON.stringify({
            date: data.date,
            temp: data.temperature,
            user_respone: data.user_respone
        })
        });
    try{
        const newData = await post.json();
        return newData;
    }catch(error){
        console.log("error");
    }
};

const updateUI = async () => {
    //code to fetch data from the server
    const request = await fetch('http://localhost:5500/allDataSend');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error');
    }
}

