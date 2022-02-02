// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
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
var weatherIcon = document.getElementById("weather-icon")
var fiveDayForecast = document.getElementById("five-day-forecast-h2")

// Assign other variables


// Init Function
// Fetch weather api using user input
function initFunction() {
    // Clear weather icon
    weatherIcon.textContent = ""

    // Display the city in the h1 element of the DOM
    var cityInput = document.getElementById("search-input").value
    document.getElementById("current-city").innerHTML = (cityInput + ' ' + moment().format('l'))

    // TODO: Create empty array to push city input to 
    // TODO: Save data and city to local storage !!!!!!!!
    if (cityInput) {
      localStorage.setItem('city', JSON.stringify(cityInput))
    }

    // Adds styling to the current city box
    document.getElementById("current-city-box").classList.add("current-city-box-css")
    // TODO: CAPITILIZE FIRST LETTER !!! splice??

    var key = 'ab3f923305e165a279695e2d5b7907d5';
    var lat;
    var lon;

    // Api call to get the city lat/lon
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=5&appid=' + key)
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
          var currentTemp = data.current.temp;
          var currentWind = data.current.wind_gust;
          var currentHumidity = data.current.humidity;
          var currentUvindex = data.current.uvi;

          // Convert data to other units mph, farenheit, etc.
          convertedTemp = Math.round((currentTemp - 273.15) * 9/5 + 32);

          // Set current weather to matching elements in the DOM
          temp.textContent = ("Temp: " + convertedTemp + "°F");
          wind.textContent = ("Wind: " + currentWind + " MPH");
          humidity.textContent = ("Humidity: " + currentHumidity + "%");
          uvindex.textContent = ("UV Index: " + currentUvindex);
        
          // 5-day forecast -> DOM
          fiveDayForecast.textContent = "5-Day Forecast";

          // For loops to iterate through the forecast elements in the DOM



          // Sets uvindex colors
          if (currentUvindex <= 2.99) {
            uvindex.classList.add("uvindex-low")
          }

          else if (currentUvindex < 5.99 && currentUvindex >= 3) {
            uvindex.classList.add("uvindex-mod")
          }

          else if (currentUvindex < 7.99 && currentUvindex >= 6) {
            uvindex.classList.add("uvindex-high")
          }

          else if (currentUvindex < 10.99 && currentUvindex >= 8) {
            uvindex.classList.add("uvindex-veryhigh")
          }

          else if (currentUvindex >= 11) {
            uvindex.classList.add("uvindex-extreme")
          }

          // Create element for current weather icon
          var iconEl = document.createElement('img')

          // Sets current weather icon 
          var icon = data.current.weather[0].icon
          iconEl.src = 'https://openweathermap.org/img/w/' + icon + '.png'

          // Append element for curent weather icon
          document.getElementById("weather-icon").appendChild(iconEl)

        })
        .catch(function() {
          // catch any errors
        });
    getCity();   
    });
  }

// Get search history from local storage
function getCity() {
console.log("")
};


// Connect search history buttons to weather api in order to fetch the current weather and 5-day forecast for those cities
// Event.target? 



// Execute init function when the user releases enter key on the keyboard
var input = document.getElementById("search-input");
input.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchBtn.click();
    }
});

// Event listeners
searchBtn.addEventListener("click", initFunction)