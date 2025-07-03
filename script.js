document.addEventListener("DOMContentLoaded", function () {
  const searchInputEl = document.querySelector("#searchInput");
  const searchButtonEl = document.querySelector("#search-btn");

  searchInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  });

  searchButtonEl.addEventListener("click", fetchWeatherData);

  async function fetchWeatherData() {
    const cityName = searchInputEl.value;
    if (cityName == "") {
      alert("Enter a location");
      return;
    }
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=1063c0095b1842faafa121400252405&q=${cityName}`;

    const weather = await getWeather(apiUrl);

    document.querySelector("#location").innerHTML = weather.city;
    document.querySelector("#humidity").innerHTML = weather.humidity;
    document.querySelector("#temparature").innerHTML = weather.temparature;
    document.querySelector("#windSpeed").innerHTML = weather.windspeed;

    searchInputEl.value = "";
    searchInputEl.blur();
  }

  async function getWeather(apiUrl) {
    const response = await fetch(apiUrl);
    toastBox(response);
    const data = await response.json();
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
});
