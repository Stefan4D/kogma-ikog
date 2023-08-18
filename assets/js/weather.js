// DOM elements
var weatherInput = document.getElementById("weather-input");
var weatherSearchButton = document.getElementById("weather-search-button");
var weatherCardTitle = document.querySelector(".weather .card-title");
var weatherCardBody = document.querySelector(".weather .card-text");
var weatherHistory = document.getElementById("recent-weather");
var modal = document.getElementById("modal");

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

  // Display weather info in the UI
  weatherCardTitle.textContent = `${temperature} °C`;
  weatherCardBody.textContent = weatherDescription;
}

// modal fucntion
function showModal(message) {
  modal.querySelector(".modal-content").textContent = message;
  modal.style.display = "block";
}

//close modal function
function closeModal() {
  modal.style.display = "none";
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
  // Modal to check if city name is empty
  if (!cityName) {
    showModal("Please enter a city name");
    return;
  }

  // Fetch weather by city name
  fetchWeather(cityName).then((info) => {
    console.log(info);
    displayWeather(info);
    addToHistory(cityName);
  });
}

// Call the getWeather function (for testing)
getWeather("Enter city name");
