// **TO DO**
// access OpenWeather API using GET
// capture user input and add to API call for search
// display populated search data in main div for current weather
// display populated search data in cards for 5-day forecast
// set searched cities into localStorage
// retrieve and populate cities from localStorage and display on sidebar

// button variables
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

// capture forecast variables
var cityName = document.querySelector("#search-input");
var date = document.querySelector(".date");
var description = document.querySelector(".description");
var weatherIcon = document.querySelector(".weatherIcon");
var temperature = document.querySelector(".temperature");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var uvIndex = document.querySelector(".uvIndex");

// data for each daily forecast




// search event listener
searchButton.addEventListener("click", () => {
    // on click, capture searchInput value and save as variable to use
    const inputValue = searchInput.value;
    //   put into api call?
    // retrieve data and display?
    alert(inputValue);
});