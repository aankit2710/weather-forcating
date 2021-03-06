//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request");
const fs = require("fs");

const foreCast = (lattitude, longitude, callback) => {
  url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    lattitude +
    "," +
    longitude +
    "?unitGroup=metric&key=M7NT29E55ESDS7PT2DJUP4GS9";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather API", undefined);
    } else if (response.statusCode === 400) {
      callback("Unable to find the location", undefined);
    } else {
      fs.writeFileSync("weather.json", JSON.stringify(response.body));
      callback(
        undefined,
        {
          temperature: `It is currently ${response.body.currentConditions.temp} degrees out.`,
          conditions: `The weather condition is ${response.body.currentConditions.conditions}.`,
          precipprob: `There is a ${response.body.currentConditions.precipprob} chance of rain.`,
          description: `${response.body.description}.`,
          humidity: `The amount of humidity is ${response.body.currentConditions.humidity}`,
          maxTemp: `The maximum Temperature is ${response.body.days[0].tempmax}`,
          minTemp: `The minimum Temperature is ${response.body.days[0].tempmin}`
        } 
      );
    }
  });
};
module.exports = foreCast;
