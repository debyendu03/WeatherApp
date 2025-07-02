const searchInputEl = document.querySelector("#searchInput");
const searchButtonEl = document.querySelector("#search-btn");

searchButtonEl.addEventListener("click", async function () {
  const cityName = searchInputEl.value;
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=1063c0095b1842faafa121400252405&q=${cityName}`;

  const weather = await getWeather(apiUrl);

  const locationEl = document.querySelector("#location");
  const humidityEl = document.querySelector("#humidity");
  const temparatureEl = document.querySelector("#temparature");
  const windspeedEl = document.querySelector("#windSpeed");

  locationEl.innerHTML = weather.city;
  humidityEl.innerHTML = weather.humidity;
  temparatureEl.innerHTML = weather.temparature;
  windspeedEl.innerHTML = weather.windspeed;
});

async function getWeather(apiUrl) {
  const response = await fetch(apiUrl);
  toastBox(response);
  const data = await response.json();
  console.log(data);
  const weather = {
    city: data.location.name,
    humidity: data.current.humidity,
    temparature: data.current.temp_c,
    windspeed: data.current.wind_kph,
  };
  return weather;
}

function toastBox(response) {
  let toastBoxText = document.querySelector(".toastBox");
  toastBoxText.style.display = "block";

  if (response.status === 200) {
    toastBoxText.innerHTML = "Weather Data fetched successfully";
  } else {
    toastBoxText.innerHTML = "Unable to fetch weather data";
  }

  setTimeout(() => {
    toastBoxText.style.display = "none";
  }, 10000);
}
