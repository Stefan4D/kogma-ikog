// DOM elements
var weatherInput = document.getElementById("weather-input");
var weatherSearchButton = document.getElementById("weather-search-button");
var weatherCardHeader = document.querySelector("#weather-card-header");
var weatherCardTitle = document.querySelector(".weather .card-title");
var weatherCardBody = document.querySelector(".weather .card-text");
var weatherHistory = document.getElementById("recent-weather");

// Event listener for search button
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

// Function to display weather info
function displayWeather(weatherInfo) {
  // get information weatherInfo from object
  var temperature = weatherInfo.main.temp;
  var weatherDescription = weatherInfo.weather[0].description;
  var weatherIcon = weatherInfo.weather[0].icon; // New line

  // Display weather info in the UI
  weatherCardHeader.textContent = weatherInfo.name;
  weatherCardTitle.textContent = `${temperature} °C`;
  weatherCardBody.textContent = weatherDescription;

  var weatherIconElement = document.getElementById("weather-icon");
  weatherIconElement.src = `https://openweathermap.org/img/w/${weatherIcon}.png`; // New line
}

// function to add search history city
function addToHistory(cityName) {
  var buttons = Array.from(weatherHistory.querySelectorAll("button"));
  var historyCount = buttons.length;

  // if history count exceeds 5, remove the oldest button
  if (historyCount >= 5) {
    weatherHistory.removeChild(buttons[0]);
  }

  // Create a new button element
  var button = document.createElement("button");
  button.textContent = cityName;
  button.classList.add("btn", "btn-secondary", "history-button");
  button.dataset.item = cityName;

  // Add slight spacing between buttons
  button.style.marginRight = "8px";
  button.style.marginBottom = "8px";

  // Add event listener to the button
  button.addEventListener("click", function () {
    weatherInput.value = cityName;
    getWeather(cityName);
  });

  weatherHistory.appendChild(button);
}
// weather info function
function getWeather(cityName) {
  // If no cityName provided then return
  if (!cityName) return;
  // Fetch weather by city name
  fetchWeather(cityName).then((info) => {
    displayWeather(info);
    addToHistory(cityName);
  });
}

// Call the getWeather function (for testing)
getWeather("London");
