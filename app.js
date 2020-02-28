const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const buttonDay1Element = document.querySelector(".day1");
const buttonDay2Element = document.querySelector(".day2");
const buttonDay3Element = document.querySelector(".day3");
const buttonDay4Element = document.querySelector(".day4");
const buttonDay5Element = document.querySelector(".day5");

const day1 = {}; const day2 = {}; const day3 = {}; const day4 = {}; const day5 = {};
const uniqDays = [];
const mass = [];

day1.temperature = {
  unit : "celsius"
}
day2.temperature = {
  unit : "celsius"
}
day3.temperature = {
  unit : "celsius"
}
day4.temperature = {
  unit : "celsius"
}
day5.temperature = {
  unit : "celsius"
}

const KELVIN = 273;
const key = "119330c3e5a71515ea22dd8eee604c01";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;

    console.log(api);
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            day1.name = data.list[0].dt_txt.slice(0, -9).split("-").reverse().join(".");
            day1.temperature.value = Math.floor(data.list[0].main.temp - KELVIN);
            day1.description = data.list[0].weather[0].description;
            day1.iconId = data.list[0].weather[0].icon;
            day1.city = data.city.name;
            day1.country = data.city.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
  buttonDay1Element.innerHTML = `<button><p>${day1.name}</p></button>`;
  iconElement.innerHTML = `<img src="icons/${day1.iconId}.png"/>`;
  tempElement.innerHTML = `${day1.temperature.value}°<span>C</span>`;
  descElement.innerHTML = day1.description;
  locationElement.innerHTML = `${day1.city}, ${day1.country}`;
}
/*
function filteredUniqDays(mass){
  const filteredDay = mass.filter((day) => {
    let currentDate = day.dt_txt.slice(0, -9).split("-").reverse().join(".");
    if (!uniqDates.includes(currentDate)) {
      uniqDates = [...uniqDates, ...[currentDate]];
    }

    return uniqDays;
}*/
/*
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});*/

