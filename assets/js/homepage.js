var searchedCity = document.getElementById("search-city");
var submitButton = document.getElementById("city-submit");
var historyButton = document.getElementById("history");
var previousSearchEl = document.getElementById("previous-search");
var weatherDisplay = document.querySelectorAll("#weather-display");
var cardConEl = document.getElementById("card-container");
var resetBtn = document.getElementById("reset");
var forecastEl = document.getElementById("forecast");
var apiKey = "309fbc7e18cf879d452be18a2a9572e8";
var currentDay = moment().format('l');
var clickedOldSearch = ""
var previousSearch = [];
weatherDisplay.textContent = "";
forecastEl.textContent = "";

// saves function 
var newSave = function () {
    localStorage.setItem('previousSearches', JSON.stringify(previousSearch))
}
// loading function
var oldSaves = function () {
    if (localStorage.getItem('previousSearches') == null) {
        localStorage.setItem('previousSearches', JSON.stringify(previousSearch))
    }

    previousSearch = JSON.parse(localStorage.getItem('previousSearches'))
    savedPreviousSearch();
}
// uses geolocation api to get the lon and lat of user submitted city 
var getLocation = function (city) {
    var locationApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(locationApiUrl)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data)
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    getWeather(lat, lon)
                })
        })
    savedPreviousSearch()
}
// handles the user click on submit button 
var citySubmitHandler = function (event) {
    event.preventDefault();
    var sumbittedCity = searchedCity.value.trim();
    if (sumbittedCity) {
        getLocation(sumbittedCity);
        previousSearch.push(sumbittedCity);
        searchedCity.value = "";
    }
}
// uses weather api using the lat and lon from the geolocation api, then creates the current weather display,as well as the 5 day forecast  
var getWeather = function (lat, lon) {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    var currentWeather = document.getElementById("real-time-weather")

    fetch(weatherApiUrl)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    currentWeather.textContent = "";
                    cardConEl.textContent = "";
                    // Current Time weather 
                    var currentCity = document.createElement("h3")
                    // checks to see if user selected a previous search 
                    if (previousSearch[i] == undefined) {
                        currentCity.textContent = clickedOldSearch + " (" + currentDay + ")";
                    } else {
                        currentCity.textContent = previousSearch[i] + " (" + currentDay + ")";
                    }
                    currentWeather.appendChild(currentCity);
                    currentTemp = document.createElement("li")
                    currentTemp.textContent = "Temp: " + data.current.temp + "??F";
                    currentCity.prepend(currentTemp);
                    var currentIcon = document.createElement("li");
                    currentIcon.innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png" width="50px" height="50px" alt="">';
                    currentCity.append(currentIcon)
                    var currentWind = document.createElement("li");
                    currentWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    currentCity.append(currentWind);
                    var currentHum = document.createElement("li");
                    currentHum.textContent = "Humidity: " + data.current.humidity + " %";
                    currentCity.append(currentHum);

                    // creates UV index and colors it according to levels 
                    var uviEl = document.createElement('li');
                    uviEl.setAttribute("id", "uv-el");
                    currentCity.append(uviEl);
                    var currentUvi = document.createElement("p");
                    currentUvi.textContent = "UV Index: "
                    uviEl.appendChild(currentUvi);
                    var currentUvColor = document.createElement("p")
                    currentUvColor.textContent = data.current.uvi
                    currentUvColor.setAttribute("id", "uv-col")
                    if (data.current.uvi < 2) {
                        currentUvColor.setAttribute("style", "background: green;");
                    } else if (2 < data.current.uvi < 5) {
                        currentUvColor.setAttribute("style", "background: yellow; color: black;");
                    } else if (6 < data.current.uvi < 7) {
                        currentUvColor.setAttribute("style", "background: orange;");
                    } else if (8 < data.current.uvi < 10) {
                        currentUvColor.setAttribute("style", "background: red;");
                    } else if (10 < data, current.uvi) {
                        currentUvColor.setAttribute("style", "background: rgb(0, 153, 255);");
                    }
                    uviEl.appendChild(currentUvColor);


                    forecastEl.textContent = "5-Day Forecast:"



                    //  5 day forecast 
                    for (i = 1; i < data.daily.length - 2; i++) {
                        var cardEl = document.createElement("ul")
                        cardEl.setAttribute("id", "card")
                        cardConEl.appendChild(cardEl)
                        cardDate = document.createElement("h4")
                        cardDate.innerHTML = moment().add([i], "days").format("l");
                        cardEl.appendChild(cardDate);
                        currentCity.appendChild(currentTemp);
                        var cardIcon = document.createElement("li");
                        cardIcon.innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png" width="50px" height="50px" alt="">';
                        cardEl.appendChild(cardIcon)
                        var cardTemp = document.createElement("li")
                        cardTemp.textContent = "Temp: " + data.daily[i].temp.day + "??F";
                        cardEl.appendChild(cardTemp);
                        var cardWind = document.createElement("li")
                        cardWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"
                        cardEl.appendChild(cardWind);
                        var cardHum = document.createElement("li")
                        cardHum.textContent = "Humidity: " + data.daily[i].humidity + " %";
                        cardEl.appendChild(cardHum);
                    }

                })
        })

}


// creates previous searches into buttons on page for users to use to look up
var savedPreviousSearch = function () {

    previousSearchEl.innerHTML = "";



    for (i = 0; i < previousSearch.length; i++) {

        var previousCity = document.createElement("p")
        previousCity.textContent = previousSearch[i];

        previousCity.setAttribute("class", previousSearch[i])
        previousCity.setAttribute("id", "old-search")
        previousSearchEl.appendChild(previousCity);
    }
    // saves data to local storage 
    newSave();
}
// creates reset button to clear the preivous searches 
var searchReset = function (event) {
    previousSearch = []
    localStorage.clear();
    previousSearchEl.innerHTML = "";
}
// event listener for previous searches 
document.addEventListener("click", function (event) {
    if (event.target.id == "old-search") {
        var oldSearch = event.target.textContent;
        clickedOldSearch = oldSearch
        getLocation(oldSearch)
    };
});

// submit button event listener 
submitButton.addEventListener("click", citySubmitHandler)

// reset button event listener 
resetBtn.addEventListener("click", searchReset)


// loads previous saved searches 
oldSaves()


