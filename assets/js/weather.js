// DOM elements
// var searchInput = document.getElementById("search-input");
// var searchButton = document.getElementById("search-button");
// var weatherData = document.getElementById("weather-data");
// var historyList = document.getElementById("history-list");
// var forecast = document.getElementById("forecast");

//  search button
// searchButton.addEventListener("click", getWeather)
// Function to fetch
function fetchWeather(cityName) {
  var apiKey = "e65881984450c0477412f63cf68a5579";
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  ).then(function (response) {
    return response.json();
  });
}
function getWeather() {
  // Get the city
  var cityName = searchInput.value;

  //   // city name alert
  //   if (!cityName) {
  //     alert("Please enter a city name");
  //     return;
  //   }

  fetchWeather(cityName).then((info) => {
    //     displayWeather(info);
    console.log(info);
    //     addToHistory(cityName);
  });
}

fetchWeather("Birmingham");
