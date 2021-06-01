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

// data variables for each daily forecast

// day 1
var date1 = document.querySelector(".date1");
var description1 = document.querySelector(".description1");
var temperature1 = document.querySelector(".temperature1");
var humidity1 = document.querySelector(".humidity1");
var uvIndex1 = document.querySelector(".uvIndex1");

// day 2
var date2 = document.querySelector(".date2");
var description2 = document.querySelector(".description2");
var temperature2 = document.querySelector(".temperature2");
var humidity2 = document.querySelector(".humidity2");
var uvIndex2 = document.querySelector(".uvIndex2");

// day 3
var date3 = document.querySelector(".date3");
var description3 = document.querySelector(".description3");
var temperature3 = document.querySelector(".temperature3");
var humidity3 = document.querySelector(".humidity3");
var uvIndex3 = document.querySelector(".uvIndex3");

// day 4
var date4 = document.querySelector(".date4");
var description4 = document.querySelector(".description4");
var temperature4 = document.querySelector(".temperature4");
var humidity4 = document.querySelector(".humidity4");
var uvIndex4 = document.querySelector(".uvIndex4");

// day 5
var date5 = document.querySelector(".date5");
var description5 = document.querySelector(".description5");
var temperature5 = document.querySelector(".temperature5");
var humidity5 = document.querySelector(".humidity5");
var uvIndex5 = document.querySelector(".uvIndex5");



// search event listener
searchButton.addEventListener("click", () => {
    // on click, capture searchInput value and save as variable to use
    const inputValue = searchInput.value;
    //   put into api call?
    // retrieve data and display?
    alert(inputValue);
});