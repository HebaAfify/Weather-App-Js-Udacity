// Setup empty JS object to act as endpoint for all routes
projectData = {};

const { request, response } = require('express');
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5500;
app.listen(port, () => {console.log(`server is running at port ${port}`);});

app.get('/allDataSend', (Request, response) => {
    response.send(projectData);
})

// post data to server
app.post ('/weatherData', (request, response) =>{
    //code to add data to end point
    projectData["temp"] = request.body.temp;
    projectData["date"] = request.body.date;
    projectData["user_response"] = request.body.user_response;
    response.send(projectData);
    console.log(projectData);
})

