var currentCity = '';
var citySearchInput = document.getElementById('city-input');
var inputButton = document.getElementById("search-button");

var getWeather = function() {
    var apiKey = "eb848b2179be8e550ab0dfce863a3308";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ currentCity +"&appid=" + apiKey + "&units=imperial";
    
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            var coords = data.coord;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,daily&appid=${apiKey}`)
            .then(function(response) {
                return response.json();
            }).then(function(uvData) {
                console.log(uvData);

                var today = new Date(data.dt * 1000).toLocaleDateString('en-US');
                
                // Set City Title
                document.getElementById('cityTitle').textContent = currentCity + " " + today;
                document.getElementById('weatherIcon').src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

                // Set Temp/Wind/Humidity
                document.getElementById("temp").textContent = "Temp: " + Math.round(data.main["temp"]) + "°F";
                document.getElementById("wind").textContent = "Wind: " + Math.round(data.wind.speed) + " MPH";
                document.getElementById("humidity").textContent = "Humidity: " + Math.round(data.main.humidity) + " %";
                
                // Set UV index
                var uvi = uvData.current.uvi;
                document.getElementById("uv").textContent = "UV Index: ";
                document.getElementById("uv-icon").textContent = uvi;
                // get uvi type
                var uviClass = '';
                if (uvi <= 2) {
                    uviClass = 'favorable-uvi';
                } else if (uvi > 2 && uvi <= 7) {
                    uviClass = 'moderate-uvi';
                } else {
                    uviClass = 'severe-uvi';
                }
                
                document.getElementById("uv-icon").setAttribute('class', "badge "+ uviClass);
            });

            
        });
}

var onSearch = function() {
    currentCity = citySearchInput.value;
    console.log('city ', currentCity);

    getWeather();
}

inputButton.onclick = onSearch;