var searchedCity = document.getElementById("search-city");
var submitButton = document.getElementById("city-submit");
var historyButton = document.getElementById("history");
var previousSearchEl = document.getElementById("previous-search");
var weatherDisplay = document.querySelectorAll("#weather-display");
var cardConEl = document.getElementById("card-container");
var resetBtn = document.getElementById("reset");
var apiKey = "309fbc7e18cf879d452be18a2a9572e8"
var currentDay = moment().format('l');
var clickedOldSearch = ""
var previousSearch = [];
weatherDisplay.textContent = "";

var newSave = function() {
    localStorage.setItem('previousSearches',JSON.stringify(previousSearch))
}

var  oldSaves = function() {   
    if (localStorage.getItem('previousSearches') == null){
        localStorage.setItem('previousSearches', JSON.stringify(previousSearch))
    }

    previousSearch = JSON.parse(localStorage.getItem('previousSearches'))
    savedPreviousSearch();
}
var getLocation = function (city) {
    var locationApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(locationApiUrl)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data)
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    // console.log(lat);
                    // console.log(lon);
                    getWeather(lat, lon)
                })
        })
    savedPreviousSearch()
}
var citySubmitHandler = function (event) {
    event.preventDefault();
    var sumbittedCity = searchedCity.value.trim();
    if (sumbittedCity) {
        getLocation(sumbittedCity);
        previousSearch.push(sumbittedCity);
        console.log(previousSearch)
        searchedCity.value = "";
    }
} 

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
                    if (previousSearch[i] == undefined) {
                        currentCity.textContent = clickedOldSearch + " (" + currentDay + ")";
                    } else{
                        currentCity.textContent = previousSearch[i] + " (" + currentDay + ")";
                    }
                    
                    currentWeather.appendChild(currentCity);
                    var currentTemp = document.createElement("li")
                    currentTemp.textContent = "Temp: " + data.current.temp + "°F";
                    currentCity.appendChild(currentTemp);
                    var currentWind = document.createElement("li");
                    currentWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    currentCity.appendChild(currentWind);
                    var currentHum = document.createElement("li");
                    currentHum.textContent = "Humidity: " + data.current.humidity + " %";
                    currentCity.appendChild(currentHum);
                    var currentUvi = document.createElement("li");
                    currentUvi.textContent = "UV Index: " + data.current.uvi;
                    currentCity.appendChild(currentUvi);
                    console.log(data);
                    for (i = 1; i < data.daily.length-2; i++) {
                        var cardEl = document.createElement("ul")
                        cardEl.setAttribute("id", "card")
                        cardConEl.appendChild(cardEl)
                        cardDate = document.createElement("h4")
                        cardDate.innerHTML = moment().add([i], "days").format("l");
                        cardEl.appendChild(cardDate);
                        var cardTemp = document.createElement("li")
                        cardTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
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



var savedPreviousSearch = function () {

    previousSearchEl.innerHTML = "";


    
    for (i = 0; i < previousSearch.length; i++) {

        var previousCity = document.createElement("li")
        previousCity.textContent = previousSearch[i];

        previousCity.setAttribute("class", previousSearch[i])
        previousCity.setAttribute("id", "old-search")
        previousSearchEl.appendChild(previousCity);
    }
    newSave();
}

var searchReset = function(event) {
    previousSearch = []
    localStorage.clear();
    previousSearchEl.innerHTML = "";
}

document.addEventListener("click", function (event) {
    if (event.target.id == "old-search") {
        var oldSearch = event.target.textContent;
        clickedOldSearch = oldSearch
        getLocation(oldSearch)
    };
});
submitButton.addEventListener("click", citySubmitHandler)
resetBtn.addEventListener("click", searchReset)



oldSaves()

// localStorage.getItem(JSON.stringify(previousSearches))


// 309fbc7e18cf879d452be18a2a9572e8

// add catch 