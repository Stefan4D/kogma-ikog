const apiKey = "2FoBb70zQU4HJwKQirTikAUE1ZQgpI95";

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
      console.log(data);
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

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // do something with the data
      console.log(data.response.docs);
    })
    .catch((error) => console.error(error));
}
// getArticles("Bananas");
