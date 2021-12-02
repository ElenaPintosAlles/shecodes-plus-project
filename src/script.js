let now = new Date();

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
let month = months[now.getMonth()];

let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${day}, ${date}.${month}.${year} ${hours}:${minutes}`;

console.log(day);
console.log(now.getDate());
console.log(month);
console.log(now.getFullYear());
console.log(now.getHours());
console.log(now.getMinutes());

function updateTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
 
  document.querySelector("#temperature").innerHTML = temperature;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-city").innerHTML = response.data.name;
  
}

//   let iconElement = document.querySelector("#icon");
//iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response..data.weather[0].icon}@2x.png`);

function search(town) {
  let apiKey = "bcec07f4d24f0897e35b27235c1cbd67";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let town = document.querySelector("#enter-city").value;
  search(town);
}

search("New York");

function handlePosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "bcec07f4d24f0897e35b27235c1cbd67";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);
