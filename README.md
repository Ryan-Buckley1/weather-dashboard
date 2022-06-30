# weather-dashboard

## API usage

### This app uses two different Web APIs. 
<li> It uses a geolocation API to search a city's lattitude and longitude in order for the weather api to work.</li>
<li> It uses a weather API to fetch current weather and a 5 day forecast for users to see </li>

### Use:
When the user wants to see the current weather and 5-day forecast for their city of choice, they fill the text area with their city name. The city name is then translated to lat/lon and sent to the weather api which returns the weather data. Data is sifted through and displays the city of choice, date, temperature, wind, UV index, humidity, and icon representing what it looks like outside for the current day. The 5-day forecast displays the date, temperature, wind, humidity, and an icon representing what they should expect. Upon searching another city, the previously searched city is then added as a button for the user to use to re-search that city without having to type the city out again making it easy for the user to switch from city to city. If the user is trying to plan a new trip they can use the Reset Search History button to clear local storage and start fresh!


link to live page https://ryan-buckley1.github.io/weather-dashboard/  

<img src="assets\images\WeatherDashboard.png"></img>