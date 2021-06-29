$(".forecast").hide();
$(".current-weather").hide();

var apiKey = "7df541090361c190f5ec65dbaea6bf16";

function fetchWeatherForCity(city) {
    $(".current-weather").show();
    $(".forecast").show();

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
                    city + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function (data) {

        currentForeCast();
        fiveDayForecast(data);

    })
}

function fiveDayForecast(data) {

    console.log(data);
    console.log(data.city);
    console.log(data.list[0]);
    console.log(data.list[0].dt_txt.split(' ')[0]);

    $("#five-day-forecast").empty();

    for (var day=0; day<data.list.length; day++) {

        var date = data.list[day].dt_txt.split(' ')[0];
        var time = data.list[day].dt_txt.split(' ')[1];

        if (time === "15:00:00") {

            var icon = data.list[day].weather[0].icon;
            var temperature = data.list[day].main.temp;
            var fahrenheit = ((temperature - 273.15) * 1.80 + 32).toFixed(2);
            var wind = data.list[day].wind.speed;
            var humidity = data.list[day].main.humidity;

            var appendBlock = 
                `<div class="card col-md-2 ml-4 bg-primary text-white">
                    <div class="card-body p-3 forecast-body">
                        <h4 class="card-title">${date}</h4>
                        <img src="https://openweathermap.org/img/w/${icon}.png"></img>
                        <p class="card-text forecast-temp">Temperature: ${fahrenheit}°F</p>
                        <p class="card-text forecast-wind">Wind Speed: ${wind}MPH</p>
                        <p class="card-text forecast-humidity">Humidity: ${humidity}%</p>
                    </div>
                </div>`;

            $("#five-day-forecast").append(appendBlock);
        }
    }
}

function currentForeCast() {

    var city = $("#search-input").val().trim();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
                    city + "&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function (data) {

        $("#current-city-forecast").empty();
        console.log(data);

        var cityName = data.name;
        var date = moment().format("MMM Do YYYY");
        var icon = data.weather[0].icon;
        var temperature = data.main.temp;
        var fahrenheit = ((temperature - 273.15) * 1.80 + 32).toFixed(2);
        var wind = data.wind.speed;
        var humidity = data.main.humidity;

        var appendBlock = 
            `<div class="card>
                <div class="card-body">
                    <h4 class="card-title">${cityName} Today</h4>
                    <h4 class="card-title">${date}
                        <img src="https://openweathermap.org/img/w/${icon}.png"></img>
                    </h4>
                    <p class="card-text current-temp">Temperature: ${fahrenheit}°F</p>
                    <p class="card-text current-wind">Wind Speed: ${wind}MPH</p>
                    <p class="card-text current-humidity">Humidity: ${humidity}%</p>
                </div>
            </div>`;

        $("#current-city-forecast").append(appendBlock);

    })                

}


$("#search-button").on("click", function (event) {

    event.preventDefault();

    var city = $("#search-input").val().trim();

    if (city === "") {
        return;
    }

    localStorage.setItem("city", city);
    // var searchCityList = JSON.parse(localStorage.getItem("search-list"));
    // searchCityList[city] = true;
    // localStorage.setItem("search-list"), JSON.stringify(searchCityList);

    fetchWeatherForCity(city);
});

$("#search-button").keypress(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#search-button").click();
    }
});

