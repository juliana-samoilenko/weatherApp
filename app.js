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
const buttons = document.querySelector(".buttons-days").children;
console.log(buttons[0]);

const weatherByDate = {};
let activeDayDate = new Date();
activeDayDate = getToday(activeDayDate);
let allDays = [];

function getToday(today) {
  let dayDate = today.getDate();
  let monthDate = today.getMonth() + 1;
  if (monthDate < 10) {
    monthDate = '0' + monthDate;
  }
  let yearDate = today.getFullYear();
  return `${yearDate}-${monthDate}-${dayDate}`;
};

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
          createNameButton();
          addAttributeDiv();
          renderDayWeather();
        });
}

let keyDay = '';
function getWeatherByDate(data) {
  for (const oneData of data) {
  const nameDay = oneData.dt_txt.slice(0, -9);
  keyDay = nameDay;
  if (!weatherByDate.hasOwnProperty(nameDay)) {
    const weather = new Object();
    weather.temperature = Math.floor(oneData.main.temp - KELVIN);
    weather.description = oneData.weather[0].description;
    weather.iconId = oneData.weather[0].icon;
    weatherByDate[nameDay] = weather;
  }
  }
};

function createNameButton() {
  allDays = Object.keys(weatherByDate);
  allDays = allDays.slice(0, -2);

  for (let i = 0; i < 5; i++) {
    let currentDay = allDays[i].split("-").reverse().join(".");;
    let currentButton = buttons[i];
    currentButton.innerHTML = `<button><p>${currentDay}</p></button>`;
  }
}

function addAttributeDiv() {
  for (let i = 0; i < 5; i++) {
    let currentButton = buttons[i];
    currentButton.setAttribute('date', allDays[i]);
  }
}

function renderDayWeather(){
  const normalizedFormatDate = keyDay.split("-").reverse().join(".");
  //buttonDay1Element.innerHTML = `<button><p>${normalizedFormatDate}</p></button>`;
  iconElement.innerHTML = `<img src="icons/${weatherByDate[keyDay].iconId}.png"/>`;
  tempElement.innerHTML = `${weatherByDate[keyDay].temperature}°<span>C</span>`;
  descElement.innerHTML = weatherByDate[keyDay].description;
  locationElement.innerHTML = `${weatherByDate.city}, ${weatherByDate.country}`;
};

function normalizedFormatDate(date) {
  date = date.split("-").reverse().join(".");
};

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

