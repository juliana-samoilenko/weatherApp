const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const currentActiveDate = document.querySelector('.active');

const buttonDay1Element = document.querySelector(".day1");
const buttonDay2Element = document.querySelector(".day2");
const buttonDay3Element = document.querySelector(".day3");
const buttonDay4Element = document.querySelector(".day4");
const buttonDay5Element = document.querySelector(".day5");
const divs = document.querySelector(".buttons-days").children;

const KELVIN = 273;
const key = "119330c3e5a71515ea22dd8eee604c01";
const weatherByDate = {};
let today = new Date();
today = getToday(today);
let allDays = [];
let dateCurrentDay = '';

function getToday(date) {
  let dayDate = date.getDate();
  if (dayDate < 10) {
    dayDate = '0' + dayDate;
  }
  let monthDate = date.getMonth() + 1;
  if (monthDate < 10) {
    monthDate = '0' + monthDate;
  }
  let yearDate = date.getFullYear();
  return `${yearDate}-${monthDate}-${dayDate}`;
};

if ('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
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

function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
  fetch(api)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      getWeatherByDate(data.list)
      weatherByDate.city = data.city.name;
      weatherByDate.country = data.city.country;
    })
    .then(function(){
      createNameButton();
      addAttributeDiv();
      renderByDay(today);
    });
}

function getWeatherByDate(data) {
  for (const oneData of data) {
  const nameDay = oneData.dt_txt.slice(0, -9);
  if (!weatherByDate.hasOwnProperty(nameDay)) {
    dateCurrentDay = nameDay;
    const weather = new Object();
    weather.temperature = Math.floor(oneData.main.temp - KELVIN);
    weather.description = oneData.weather[0].description;
    weather.iconId = oneData.weather[0].icon;
    weatherByDate[dateCurrentDay] = weather;
    }
  }
};

function createNameButton() {
  allDays = Object.keys(weatherByDate);
  allDays = allDays.slice(0, -2);

  for (let i = 0; i < 5; i++) {
    const currentDay = allDays[i].split("-").reverse().join(".");;
    const currentDiv = divs[i];
    currentDiv.innerHTML = `<button><p>${currentDay}</p></button>`;
  }
}

function addAttributeDiv() {
  for (let i = 0; i < 5; i++) {
    let currentDivs = divs[i];
    currentDivs.setAttribute('date', allDays[i]);
  }
}

const renderByDay = (dateCurrentDay) => {
  iconElement.innerHTML = `<img src="icons/${weatherByDate[dateCurrentDay].iconId}.png"/>`;
  tempElement.innerHTML = `${weatherByDate[dateCurrentDay].temperature}°<span>C</span>`;
  descElement.innerHTML = weatherByDate[dateCurrentDay].description;
  locationElement.innerHTML = `${weatherByDate.city}, ${weatherByDate.country}`;
};

const changeCurrentActiveDay = (target) => {
  currentActiveDate.classList.remove('active');
  const newActiveDate = target;
  newActiveDate.classList.add('active');
};

buttonDay1Element.addEventListener("click", function() {
  const targetDiv = event.currentTarget;
  dateCurrentDay = targetDiv.getAttribute('date');
  changeCurrentActiveDay(targetDiv);
  renderByDay(dateCurrentDay);
});

buttonDay2Element.addEventListener("click", function() {
  const targetDiv = event.currentTarget;
  dateCurrentDay = targetDiv.getAttribute('date');
  changeCurrentActiveDay(targetDiv);
  renderByDay(dateCurrentDay);
});

buttonDay3Element.addEventListener("click", function() {
  const targetDiv = event.currentTarget;
  dateCurrentDay = targetDiv.getAttribute('date');
  changeCurrentActiveDay(targetDiv);
  renderByDay(dateCurrentDay);
});

buttonDay4Element.addEventListener("click", function() {
  const targetDiv = event.currentTarget;
  dateCurrentDay = targetDiv.getAttribute('date');
  changeCurrentActiveDay(targetDiv);
  renderByDay(dateCurrentDay);
});

buttonDay5Element.addEventListener("click", function() {
  const targetDiv = event.currentTarget;
  dateCurrentDay = targetDiv.getAttribute('date');
  changeCurrentActiveDay(targetDiv);
  renderByDay(dateCurrentDay);
});
