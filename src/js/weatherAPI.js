var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
//var conditionsResponse;
//var forecastResponse;

// GET THE CONDITIONS
weatherConditions.open("GET", "http://api.wunderground.com/api/bf2192b864885ff8/forecast/geolookup/conditions/q/Croatia/Osijek.json");
weatherConditions.responseType = "text";
weatherConditions.send();

// GET THE FORECAST
weatherForecast.open("GET", "http://api.wunderground.com/api/bf2192b864885ff8/forecast/geolookup/forecast/q/Croatia/Osijek.json");
weatherForecast.responseType = "text";
weatherForecast.send();

weatherConditions.onload = function() {
  if (weatherConditions.status === 200) {
    var conditionsResponse = JSON.parse(weatherConditions.responseText);
    console.log(conditionsResponse);

    document.getElementById("temperatureToday").innerHTML = conditionsResponse.current_observation.temp_c + "&deg;C";

    // Day 1
    document.getElementById("temperatureTomorrow").innerHTML = conditionsResponse.current_observation.temp_c + "&deg;C";
  }
}

weatherForecast.onload = function() {
  if (weatherForecast.status === 200) {
    var forecastResponse = JSON.parse(weatherForecast.responseText);
    console.log(forecastResponse);

    document.getElementById("cityToday").innerHTML = forecastResponse.location.city;
    document.getElementById("descriptionToday").innerHTML = forecastResponse.forecast.simpleforecast.forecastday[0].conditions;

    //Day 1
    document.getElementById("cityTomorrow").innerHTML = forecastResponse.location.city;
    document.getElementById("descriptionTomorrow").innerHTML = forecastResponse.forecast.simpleforecast.forecastday[1].conditions;
  }
}