var currentCity = "Austin";

var getWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=austin&appid=" + "eb848b2179be8e550ab0dfce863a3308" + "&units=imperial";

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            document.getElementById("current-day").textContent = "Temp: " + Math.round(data.main["temp"]) + "°F" + " " + "Wind: " + data.wind.speed + " MPH" + " " + "Humidity: " + data.main.humidity + "%";
        })
}



getWeather();