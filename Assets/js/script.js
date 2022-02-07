// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// Assign DOM variables
var searchBtn = document.querySelector(".search-btn")
var temp = document.getElementById("temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var uvindex = document.getElementById("uvindex")
var weatherIcon = document.getElementById("weather-icon")
var fiveDayForecast = document.getElementById("five-day-forecast-h2")

// Assign other variables
var cities = []

// Init Function
// Fetch weather api using user input
function initFunction(savedSearch) {
    // Clear weather icon
    weatherIcon.textContent = ""
    currentUvindex = ""
    currentHumidity = ""
    currentTemp = ""
    currentWind = ""

    // Display the city in the h1 element of the DOM
    var cityInput = document.getElementById("search-input").value;

    var searchedCity = cityInput ? cityInput : savedSearch; 

    // TODO: CAPITILIZE FIRST LETTER !!! splice??

    document.getElementById("current-city").innerHTML = (searchedCity + ' ' + moment().format('l'))

    // Push input to empty array and save data and city to local storage
    if (cityInput && !cities.includes(cityInput)) {
      cities.push(cityInput)
      localStorage.setItem('cities', cities.join(';'));
    }

    // Adds styling to the current city box
    document.getElementById("current-city-box").classList.add("current-city-box-css")

    var key = 'ab3f923305e165a279695e2d5b7907d5';
    var lat;
    var lon;

    // Api call to get the city lat/lon
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=5&appid=' + key)
    .then(function(resp) { return resp.json() })
    .then(function(data){
        lat = data[0].lat
        lon = data[0].lon

        // // If user makes an invalid entry, alert and return
        // if (Response.status !== 200){
        //   alert ("Please enter a valid city name.")
        //   document.getElementById("search-input").value = ""
        //   document.getElementById("current-city").textContent = ""
        //   return;
        // }

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
          for (let i = 0; i < 5; i++) {
            var element = data.daily[i];
            // Sets forecast dates
            var forecastDate = document.querySelectorAll(".forecast-date")[i];
            forecastDate.textContent = moment().add(i + 1, 'day').format('l');

            // Set icon
            var forecastIcon = document.querySelectorAll(".icon")[i];
             forecastIcon.src = 'https://openweathermap.org/img/w/' + element.weather[0].icon + '.png';

            // Sets forecast temps
            var forecastTemp = document.querySelectorAll(".forecast-temp")[i];
            forecastTemp.textContent = ("Temp: " + Math.round((element.temp.day - 273.15) * 9/5 + 32) + "°F");
            // TODO: code for wind & humidity 
            // Sets forecast wind
            var forecastWind = document.querySelectorAll(".forecast-wind")[i];
            forecastWind.textContent = ("Wind: " + element.wind_gust + " MPH")

            // Sets forecast humidity
            var forecastHumidity = document.querySelectorAll(".forecast-humidity")[i];
            forecastHumidity.textContent = ("Humidity: " + element.humidity + "%")

            // Sets class list for cols
            document.querySelectorAll("#forecast > .col-2")[i].classList.add("forecast-cols")
          }

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
          document.getElementById("search-input").value = ""
          getCity();
        })
        .catch(function() {
          // catch any errors
        });
      });
    }
    
    // Get search history from local storage
    function getCity() {
    document.getElementById("search-history").innerHTML = ""
    cities = localStorage.getItem("cities") ? localStorage.getItem("cities").split(";") : []
  
  //for loop to render cities to created button elements
  for (let i = 0; i < cities.length; i++) {
    var city = cities[i];
    var cityButton = document.createElement("button")
    cityButton.textContent = city

    // Add event listener to the search history buttons and change the text content of input to be empty upon clicking the button
    cityButton.addEventListener('click', function(event) {
      document.getElementById("search-input").value = ""
      initFunction(event.target.textContent)
    })

    document.getElementById("search-history").appendChild(cityButton)
    cityButton.classList.add("search-btn")
  }
};

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
getCity();   