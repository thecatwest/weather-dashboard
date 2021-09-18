// access OpenWeather API using GET
// capture user input and add to API call for search
// display populated search data in main div for current weather
// display populated search data in cards for 5-day forecast
// set searched cities into localStorage
// retrieve and populate cities from localStorage and display on sidebar

var savedSearch = document.querySelector("#saved-searches");
const savedSearches = JSON.parse(localStorage.getItem("savedCities")) || [];

// API call to search by city
const searchByCity = function (city) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=a1acf7ffaf63eef475d50de8d0125471")
        // if successful, return response in JSON to pull lat/lon from
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // capture lat/lon data with variables
            var lat = data[0].lat;
            var lon = data[0].lon;

            getWeather(city, lat, lon);
        });
};

var getWeather = function (city, lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=a1acf7ffaf63eef475d50de8d0125471")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            // wipe previous data first by setting text to empty string
            $("#current-weather-display").text(""); // wipe previous data first by setting text to empty string
            $("#days-forecast").text("");

            // set city and weather data search to localStorage
            saveSearch(city);
            // clear search input
            $("#search-input").val("");

            // set weather icon as variable
            var weatherIcon = data.current.weather[0].icon;
            // retrieve current date using Moment.js
            var date = moment().format("MM/DD/YY LT");

            // create containers and append data
            $("<div>")
                .addClass("card text-white bg-info mb-3")
                .attr("id", "current-weather-data")
                .appendTo("#current-weather-display");

            // append general city info to heading
            $("<h2>")
                .addClass("mb-3")
                .html(city + " - " + date + "<img id='current-weather-icon' src='' alt='Current Weather Icon'>")
                .appendTo("#current-weather-data");

            // retrieve current weather icon
            $("#current-weather-icon")
                .attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png")

            // create and append <p> elements into #current-weather-display
            // create and append temperature
            $("<p>")
                .text(`Temperature: ${data.current.temp} °F`)
                .appendTo("#current-weather-data");

            // create and append wind speed
            $("<p>")
                .text(`Wind Speed: ${data.current.wind_speed} mph`)
                .appendTo("#current-weather-data");

            // create and append humidity
            $("<p>")
                .text(`Humidity:  ${data.current.humidity} %`)
                .appendTo("#current-weather-data");

            // create and append UV index
            $("<p>")
                .text(`UV Index:  ${data.current.uvi}`)
                .appendTo("#current-weather-data");

            // 5-Day Forecast container
            $("<div>")
                .addClass("mt-4 flexbox days-forecast")
                .attr("id", "#days-forecast")
                .appendTo("#current-weather-display");

            // forecast heading
            $("<h2>")
                .text("Upcoming Weather")
                .appendTo(".days-forecast");

            // create and append card container to days-forecast
            $("<div>")
                .addClass("ml-1 mr-1 row card-container space-between")
                .appendTo(".days-forecast");

            // implement for counting loop for 5-day forecast cards
            for (index = 0; index < 5; index++) {
                // create, append various elements to forecast card
                // card div
                $("<div>")
                    .addClass("card pb-2 col-2 text-white bg-info")
                    .attr("id", "forecast-card" + index)
                    .appendTo(".card-container");

                // card body
                $("<div>")
                    .addClass("card-body pl-1 col")
                    .attr("id", "forecast-card-body" + index)
                    .appendTo("#forecast-card" + index);

                // header
                $("<h2>")
                    .text(moment().add(index, 'd').format("MM/DD/YY"))
                    .attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png")
                    .addClass("forecast-card-header")
                    .appendTo("#forecast-card-body" + index);

                // weather icon <p>
                // $("<p>")
                //     .addClass("forecast-card-text")
                //     .html(city +
                //         "<img id='current-weather-icon' src='' alt='Current Weather Icon'>")
                //     .appendTo("#forecast-card" + index);

                // $("#current-weather-icon")
                //     .attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png")

                // temp <p>
                $("<p>")
                    .text(`Temp: ${data.daily[index].temp.day} °F`)
                    .addClass("forecast-card-text")
                    .appendTo("#forecast-card" + index);
                // console.log(index);

                // humidity <p>
                $("<p>")
                    .text(`Humidity: ${data.daily[index].humidity} %`)
                    .addClass("forecast-card-text")
                    .appendTo("#forecast-card" + index);
                // console.log(data.daily[index].humidity);
            };
        });
};

// var getFiveDay = function (city) {
//     fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a1acf7ffaf63eef475d50de8d0125471")
//         .then(function (response) {
//             return response.json();
//         }).then(function (data) {
//             console.log("5 day data", data);
//         })
//         var day1Icon = data.list.weather.icon;
//         console.log(day1Icon);
//         console.log(data.list.weather);
//         var dailyData = (data.list[index].weather[0].icon)
// };



// set city searches into localStorage
const saveSearch = function (data) {
    for (let index = 0; index < savedSearches.length; index++) {
        if ((savedSearches[index]) === data) {
            return;
        }
    };
    savedSearches.push(data);
    localStorage.setItem("savedCities", JSON.stringify(savedSearches));
};

// create clickable buttons for saved city searches to access data
var savedButtons = function () {
    for (let index = 0; index < savedSearches.length; index++) {
        $("<button>")
            .text(savedSearches[index])
            .addClass("btn saved-btn p-1 col-12 text-white btn-info")
            .appendTo("#saved-searches");
    }

    // add event listener for button click
    $(".saved-btn").on("click", function () {
        console.log("this button doesn't suck")
        // capture button text, set as variable, call in searchByCity function
        var savedCityData = $(this).text();

        searchByCity(savedCityData);
        // getFiveDay(savedCityData);
    });
};

// city search button functionality
$("#search-button").on("click", function () {
    event.preventDefault();
    console.log("things were clicked");

    var cityData = $("#search-input").val()
    console.log(cityData);

    // pass cityData into the searchByCity() fn
    searchByCity(cityData);
});


var savedCities = localStorage.getItem("savedCities");

savedButtons(savedCities);

// console.log(savedCities);