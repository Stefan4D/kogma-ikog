const apiKey = "2FoBb70zQU4HJwKQirTikAUE1ZQgpI95";

// DOM Elements
const newsBtn = document.getElementById("news-search-button");
const newsContainer = document.getElementById("news-container");
const searchHistory = document.getElementById("news-history");
const searchInput = document.getElementById("news-search-input");
const newsCardHeader = document.getElementById("news-card-header");
const newsForm = document.getElementById("news-form");

/*
  ---------------
  State variables
  ---------------
*/
const newsSearchHistory =
  new Set(JSON.parse(localStorage.getItem("newsSearchHistory"))) || new Set(); // using a Set here to allow removal of duplicates simply
const lastNewsSearched =
  JSON.parse(localStorage.getItem("lastNewsSearched")) || ""; // set the search to use the last searched location or default to blank string

// function to call the NYT API for Top Stories
/**
 * Function to retrieve top stories from the NYT API
 * @function getTopStories
 * @returns {array} An array of the top stories
 */
function getTopStories() {
  const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // do something with the data
      // console.log(data);
      newsContainer.innerHTML = "";
      const newsItems = document.createElement("ul");
      newsContainer.appendChild(newsItems);
      for (let i = 0; i < 5; i++) {
        // console.log(data.results[i]);
        const newsItem = document.createElement("li");
        newsItem.innerHTML = `<a href="${data.results[i].short_url}">${data.results[i].title}</a>`;
        newsItems.appendChild(newsItem);
      }
      renderHistory(newsSearchHistory);
    })
    .catch((error) => console.error(error));
}
// getTopStories();

/**
 * Function to retrieve articles from the NYT API based on the provided search term
 * @function getArticles
 * @param {string} searchTerm
 * @returns {array} An array of articles based on the search term
 */
function getArticles(searchTerm = "UK") {
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${apiKey}`;

  newsCardHeader.textContent = `News Results for '${searchTerm}'`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // do something with the data
      const articles = data.response.docs;
      console.log(articles);
      newsContainer.innerHTML = "";
      const newsItems = document.createElement("ul");
      newsContainer.appendChild(newsItems);
      for (let i = 0; i < 5; i++) {
        // console.log(data.results[i]);
        const newsItem = document.createElement("li");
        newsItem.innerHTML = `<a href="${articles[i].web_url}">${articles[i].headline.main}</a>`;
        newsItems.appendChild(newsItem);
      }
      renderHistory(newsSearchHistory);
    })
    .catch((error) => console.error(error));
}
// getArticles("Bananas");

/**
 * This function handles the submission of the news search.
 * @function handleSubmit
 * @param {object} e - The event object
 */
function handleSubmit(e) {
  e.preventDefault();
  const item = searchInput.value.trim();
  if (item === "") return; // if location is blank, do nothing

  updateNewsHistory(newsSearchHistory, item);

  getArticles(item);
  localStorage.setItem("lastNewsSearched", JSON.stringify(item));
  searchInput.value = "";
}

/**
 * This function handles the button clicks of history items.
 * @function handleClick
 * @param {object} e - The event object
 */
function handleClick(e) {
  if (!e.target.matches("button")) return; // if it isn't a button, then return
  const item = e.target.dataset.item;
  updateNewsHistory(newsSearchHistory, item);
  getArticles(item);
  localStorage.setItem("lastNewsSearched", JSON.stringify(item));
}

/**
 * This function updates the search history and stores this in localStorage
 * @function updateNewsHistory
 * @param {Set} history - this is the history Set to be updated
 * @param {string} location - this is the most recently searched location
 */
function updateNewsHistory(history, item) {
  if (history.has(item)) {
    history.delete(item);
    history.add(item);
  } else {
    history.add(item);
  }

  // remove the first item in the set if there are more than 5
  if (history.size > 5) {
    history.delete(history.values().next().value);
  }
  // console.log(history);
  localStorage.setItem(
    "newsSearchHistory",
    JSON.stringify(Array.from(history))
  ); // convert to array before storing in localStorage.  This is here as storing a Set in localStorage results in a blank object
}

/**
 * This function renders the search history of the user to the page
 * @function renderHistory
 * @param {Set} history
 */
function renderHistory(history) {
  if (history.size === 0) return; // if there is no history, do nothing
  searchHistory.innerHTML = ""; // clear our the element first
  history.forEach((historyItem) => {
    const newBtn = document.createElement("button");
    newBtn.setAttribute("class", "btn btn-secondary mb-3 mx-1");
    newBtn.textContent = historyItem;
    newBtn.setAttribute("data-item", historyItem);
    searchHistory.prepend(newBtn);
  });
}

/*
  ---------------
  Event listeners
  ---------------
*/
searchHistory.addEventListener("click", handleClick);
newsBtn.addEventListener("click", handleSubmit);
newsForm.addEventListener("submit", handleSubmit);

// Load the news on page load
// If there are no previous searches then load the Top Stories
lastNewsSearched ? getArticles(lastNewsSearched) : getTopStories();
