
// access OpenWeather API using GET
// capture user input and add to API call for search
// display populated search data in main div for current weather
// display populated search data in cards for 5-day forecast
// set searched cities into localStorage
// retrieve and populate cities from localStorage and display on sidebar

var searchButton = document.querySelector("#search-button");

const forecast = function(city, lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=a1acf7ffaf63eef475d50de8d0125471")
    .then(function(response){
        return response.json();
    }).then(function(data) {
        // wipe previous data first by setting text to empty string
        $("#current-weather-display").text("");

        // set city and weather data search to localStorage
        saveSearch(city);
        // clear search input
        $("#search-input").val("");

        // set weather icon as variable
        var weatherIcon = data.current.weather[0].icon;
        // retrieve current date using Moment.js
        var date = moment().format("MM/DD/YY");

        // create containers and append data
        $("<div>")
        .addClass("card text-white bg-info mb-3")
        .attr("id", "current-weather-data")
        .appendTo("#current-weather-display");

        // retrieve current weather icon
        $("#current-weather-icon")
        .attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png")
        
        // append general city info to heading
        $("<h2>")
        .addClass("mb-3")
        .html(cityNameMain + " -" + date + "<img id='current-weather-icon' src='' alt='Current Weather Icon'>")
        .appendTo("#current-weather-data");

        // create and append <p> elements into #current-weather-display
        // create and append temperature
        $("<p>")
        .text("`Temperature: ${data.current.temp}°F`")
        .appendTo("#current-weather-data");

        // create and append wind speed
        $("<p>")
        .text("`Wind Speed: ${data.current.wind_speed}`")
        .appendTo("#current-weather-data");

        // create and append humidity
        $("<p>")
        .text("`Humidity: ${data.current.humidity}`")
        .appendTo("#current-weather-data");

        // create and append UV index
        $("<p>")
        .text("`UV Index: ${data.current.uvi}`")
        .appendTo("#current-weather-data");
        
        // 5-Day Forecast container
        $("<div>")
        .addClass("5-day-forecast mt-4")
        .appendTo("#current-weather-display")

        // forecast heading
        $("<h2>")
        .text("Upcoming 5-Day Forecast")
        .appendTo(".5-day-forecast");

        // create and append card container to 5-day-forecast
        $("<div>")
        .addClass("row card-container")
        appendTo(".5-day-forecast");

        // implement for counting loop for 5-day forecast cards
        for (let index = 0; index < 5; index++) {
            // create, append various elements to forecast card
            // card div
            $("<div>")
            .addClass("card pb-2 col-3 text-white bg-info")
            .attr("id", "forecast-card" + index)
            .appendTo(".card-container");

            // card body
            $("<div>")
            .addClass("forecast-card-body pl-1 col")
            .attr("id", "forecast-card-body" + index)
            .appendTo("#forecast-card" + index);

            // weather icon <p>
            $("<p>")
            .addClass("forecast-card-text")
            .attr("<img src='https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png' alt='Current Weather Icon'>")
            .appendTo("#forecast-card" + index);

            // header
            $("<h2>")
            .text(moment().add(index, 'd').format("MM/DD/YY"))
            .addClass("forecast-card-header")
            // .attr("")
            .appendTo("#forecast-card-body" + index);

            // temp <p>
            $("<p>")
            .text("`Temp: ${data.daily[index].temp.day}°F`")
            .addClass("forecast-card-text")
            .appendTo("#forecast-card");

            // humidity <p>
            $("<p>")
            .text("`Humidity: ${data.daily[index].humidity}%`")
            .addClass("forecast-card-text")
            .appendTo("#forecast-card");
        }
    })
}

// API call to search by city
const searchByCity = function(cityData) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityData + "&limit=1&APPID=a1acf7ffaf63eef475d50de8d0125471")
    // if successful, return response in JSON to pull lat/lon from
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // capture lat/lon data with variables
        var lat = data[0].lat;
        var lon = data[0].lon;

        getWeather(cityData, lat, lon);
    });
};

// set city searches into localStorage
const saveSearch = function(data) {
    for (let index = 0; index < savedSearches.length; index++) {
        if (savedSearches[index] === data) {
            return;
        }
    };
    savedSearches.push(data);
    localStorage.setItem("savedCities", JSON.stringify(savedSearches));
};

// city search button functionality
$("#search-button").on("click", function() {
    event.preventDefault();

    var cityData = $("#search").val()

    // pass cityData into the searchByCity() fn
    searchByCity(cityData);
});



// create clickable buttons for saved city searches to access data
var savedButtons = function(buttonsArray) {
    for (let index = 0; index < buttonsArray.length; index++) {
        $("<button>")
        .text(buttonsArray[index])
        .addClass("btn saved-btn p-1 col-12 text-white btn-info")
        .appendTo("#saved-searches");
    }

    // add event listened for button click
    $(".saved-button").on("click", function() {
        // capture button text, set as variable, call in searchByCity function
        var savedCityData = $(this).text();

        searchByCity(savedCityData);
    });
};

savedButtons(saveSearch);

// // search event listener
// searchButton.addEventListener("click", () => {
//     // on click, capture searchInput value and save as variable to use
//     const inputValue = searchInput.value;
//     //   put into api call?
//     // retrieve data and display?
//     const response =
//     fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&id=524901&APPID=a1acf7ffaf63eef475d50de8d0125471`)

//     if (response.status === 200) {
//         const data = response.json()
//         return data
//     } else {
//         throw new Error("An error has occurred. Unable to complete weather request.")
//     }
// });

// const getWeather = async(inputValue) => {
//     const response = await
//     fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=a1acf7ffaf63eef475d50de8d0125471`)

//     if (response.status === 200) {
//         const data = await response.json()
//         return data
//     } else {
//         throw new Error("An error has occurred. Unable to complete weather request.")
//     }
// };

const savedSearches = JSON.parse(localStorage.getItem("savedCities")) || [];