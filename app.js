import { KELVIN, API_KEY } from './const.js';
import {
  iconElement,
  tempElement,
  descElement,
  locationElement,
  notificationElement,
  divs,
  buttons
} from './components.js';
import getToday from './common/getToday.js';
import changeCurrentActiveDay from './common/changeCurrentActiveDay.js';

const weatherByDate = {};
const today = getToday();
let city;
let country;
let allDays = [];
let dateCurrentDay = '';

// TODO: move business functions to utils files
const getWeatherByDate = (data) => {
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

const createNameButton = () => {
  allDays = Object.keys(weatherByDate);

  for (let i = 0; i < 5; i++) {
    const currentDay = allDays[i].split("-").reverse().join(".");;
    const currentDiv = divs[i];
    currentDiv.innerHTML = `<button><p>${currentDay}</p></button>`;
  }
}

const addAttributeDiv = () => {
  for (let i = 0; i < 5; i++) {
    let currentDivs = divs[i];
    currentDivs.setAttribute('date', allDays[i]);
  }
}

const renderByDay = (dateCurrentDay) => {
  iconElement.innerHTML = `<img src="icons/${weatherByDate[dateCurrentDay].iconId}.png"/>`;
  tempElement.innerHTML = `${weatherByDate[dateCurrentDay].temperature}°<span>C</span>`;
  descElement.innerHTML = weatherByDate[dateCurrentDay].description;
  locationElement.innerHTML = `${city}, ${country}`;
};

const getWeather = (latitude, longitude) => {    
  let api = `//api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      getWeatherByDate(data.list)
      city = data.city.name;
      country = data.city.country;
    })
    .then(() => {
      createNameButton();
      addAttributeDiv();
      renderByDay(today);
    });
}

const setPosition = (position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
    
  getWeather(latitude, longitude);
}

const showError = (error) => {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

if ('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const targetDiv = event.currentTarget;
    dateCurrentDay = targetDiv.getAttribute('date');
    changeCurrentActiveDay(targetDiv);
    renderByDay(dateCurrentDay);
  });
});