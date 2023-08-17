// DOM elements
var weatherInput = document.getElementById("weather-input");
var weatherSearchButton = document.getElementById("weather-search-button");

// event listener to search button
weatherSearchButton.addEventListener("click", function () {
  var cityName = weatherInput.value;
  getWeather(cityName);
});

// Function to fetch weather info
function fetchWeather(cityName) {
  var apiKey = "e65881984450c0477412f63cf68a5579";
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  ).then(function (response) {
    return response.json();
  });
}

// Function to get weather info
function getWeather(cityName) {
  // Check if city name is empty
  if (!cityName) {
    alert("Please enter a city name");
    return;
  }

  // Fetch weather using the city name
  fetchWeather(cityName).then((info) => {
    console.log(info);
    displayWeather(info);
    addToHistory(cityName);
  });
}

// Call the getWeather (for testing)
// getWeather("Enter city name");
