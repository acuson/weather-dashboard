//Get today's date
// var currentDay = moment().format('MMMM Do, YYYY');
// document.getElementById("currentDay").innerHTML = `${currentDay}`;

//Get the city
var searchBtn = document.getElementById("search-btn")
    .addEventListener("click",getCity);

var apiKey = "4602fb8449b3bbf3a78a3202702c4926";
    
function getCity () {
    var city = document.getElementsByTagName("input")[0].value;
    console.log(city);
    document.getElementById("city").innerHTML = `${city}`;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(queryURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var query2URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`;
        console.log(query2URL);

        fetch(query2URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var temp = data.current.temp;
            var wind = data.current.wind_speed;
            var humidity = data.current.humidity;
            var uvIndex = data.current.uvi;

            document.getElementById("temp").innerHTML = `Temp: ${temp} degrees F`;
            document.getElementById("wind").innerHTML = `Wind: ${wind} MPH`;
            document.getElementById("humidity").innerHTML = `Humidity: ${humidity} %`;
            document.getElementById("uv-index").innerHTML = `UV Index: ${uvIndex}`;
    
            for (var i = 0; i < 5; i++) {
                var daily = data.daily[i];
                console.log(daily);
                //setup the html in each of the 5 days

                //set up each of the respective ids
                var dailyTemp = daily.temp.day;
                var dailyWind = daily.wind_speed;
                var dailyHumidity= daily.humidity;
                var dailyUVIndex = daily.uvi;

                //setting each of the html elements according
                //id = "dTemp0"
                document.getElementById("dTemp" + i).innerHTML = `Temp: ${dailyTemp} degrees F`;
                document.getElementById("dWind" + i).innerHTML = `Wind: ${dailyWind} MPH`;
                document.getElementById("dHumidity" + i).innerHTML = `Humidity: ${dailyHumidity} %`;
                document.getElementById("dUVIndex" + i).innerHTML = `UV Index: ${dailyUVIndex}`;


            }
        });
    });
}   
