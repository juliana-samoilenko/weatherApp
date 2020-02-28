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

const weatherByDate = {};




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

    //console.log(api);
    
    fetch(api)
        .then(function(response){
          let data = response.json();
          return data;
        })
        .then(function(data){
          getWeatherByDate(data.list);

          weatherByDate.city = data.city.name;
          weatherByDate.country = data.city.country;
        })
        .then(function(){
          displayWeather();
        });
}

let keyDay = '';
function getWeatherByDate(data) {
  for (const oneData of data) {
  const nameDay = oneData.dt_txt.slice(0, -9);
  keyDay = nameDay;
  if (!weatherByDate.hasOwnProperty(nameDay)) {
    const weather = new Object();
    weather.temperature = oneData.main.temp;
    weather.description = oneData.weather[0].description;
    weather.iconId = oneData.weather[0].icon;
    weatherByDate[nameDay] = weather;
  }
  }  
  console.log(weatherByDate);
};


function displayWeather(){
  const normalizedFormatDate = keyDay.split("-").reverse().join(".");
  buttonDay1Element.innerHTML = `<button><p>${normalizedFormatDate}</p></button>`;
  iconElement.innerHTML = `<img src="icons/${weatherByDate[keyDay].iconId}.png"/>`;
  tempElement.innerHTML = `${weatherByDate[keyDay].temperature}°<span>C</span>`;
  descElement.innerHTML = weatherByDate[keyDay].description;
  locationElement.innerHTML = `${weatherByDate.city}, ${weatherByDate.country}`;
};
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

