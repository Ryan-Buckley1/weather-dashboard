var searchedCity = document.getElementById("search-city");
var submitButton = document.getElementById("city-submit");
var apiKey = "309fbc7e18cf879d452be18a2a9572e8"

var getLocation = function(city) {
    var locationApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=" + apiKey;
    fetch(locationApiUrl)
    .then(function(response) {
        response.json()
        .then(function(data){
            console.log(data)
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(lat);
            console.log(lat);
            getWeather(lat, lon)
            
        })
        })
        }
var citySubmitHandler = function(event) {
    event.preventDefault();
    var sumbittedCity = searchedCity.value.trim();
    if (sumbittedCity) {
        getLocation(sumbittedCity);
        searchedCity.value = "";
    }
}        

var getWeather = function(lat, lon) {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid=" + apiKey;
    fetch(weatherApiUrl)
    .then(function(response){
        response.json()
        .then(function(data){
            console.log(data);
        })
        // .then(function(data) {
            // console.log(data);
        })
        
    }




submitButton.addEventListener("click", citySubmitHandler)
// getLocation();





// 309fbc7e18cf879d452be18a2a9572e8

// add catch 