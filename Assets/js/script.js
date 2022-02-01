// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// Assign DOM variables
var searchBtn = document.getElementById("search-btn")
var temp = document.getElementById("temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var uvindex = document.getElementById("uvindex")


// Assign other variables


// Init Function
// Fetch weather api using user input
function initFunction() {
    // Display the city in the h1 element of the DOM
    var cityInput = document.getElementById("search-input").value
    document.getElementById("current-city").innerHTML = cityInput
    // Adds styling to the current city box
    document.getElementById("current-city-box").classList.add("current-city-box-css")
    // !!! CAPITILIZE FIRST LETTER !!!
    // Need to do

    var key = 'ab3f923305e165a279695e2d5b7907d5';
    var lat;
    var lon;

    // Api call to get the city lat/lon
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=5&appid=' + key)
    .then(function(resp) { return resp.json() })
    .then(function(data){
        lat = data[0].lat
        lon = data[0].lon

        // Api call to get the weather data for the city
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely,alerts&appid=' + key)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
          console.log(data)

          // Fetching the current weather for the current city
          var currentTemp = data.current.temp
          var currentWind = data.current.wind_speed
          var currentHumidity = data.current.humidity
          var currentUvindex = data.current.uvi

          console.log(currentTemp)
          console.log(currentWind)
          console.log(currentHumidity)
          console.log(currentUvindex)

          // Convert data to normal properties mph, farenheit, etc.
          convertedTemp = Math.round((currentTemp - 273.15) * 9/5 + 32)

          // Set current weather to matching elements in the DOM
          temp.innerHTML = ("Temp: " + convertedTemp + "°F")


        })
        .catch(function() {
          // catch any errors
        });
    saveCity();   
    });
  }

// Store user input to local storage
function saveCity() {
console.log("")
};

// Get user input from local storage and add to the dom as a button under the search bar


// Populate 5-day forecast for current city


// Connect search history buttons to weather api in order to fetch the current weather and 5-day forecast for those cities
// Event.target? 


// Event listeners
searchBtn.addEventListener("click", initFunction)