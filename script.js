const inputCity = document.getElementById("cityInput");
const button = document.getElementById("button");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("details");

inputCity.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter" || event.target.value === "") {
    return;
  }
  await fetchCoordinates(event.target.value);

  event.target.value = "";
});

button.addEventListener("click", async () => {
  await fetchCoordinates(inputCity.value);

  inputCity.value = "";
});

async function fetchCoordinates(location) {
  const city = document.getElementById("city");
  const gps = document.getElementById("gps");
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1`
  );
  const coordinates = await response.json();

  if (coordinates.length === 0) {
    city.innerText = "Ville non trouvée";
    gps.innerText = "";
    temperature.innerText = "";
    return;
  } else city.innerText = coordinates[0].name;
  gps.innerText = `Coordonnées GPS : ${coordinates[0].lat} & ${coordinates[0].lon}`;
  await fetchWeather(coordinates[0].lat, coordinates[0].lon);
}

async function fetchWeather(lat, lon) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m`
  );
  const weather = await response.json();
  temperature.innerText = `${weather.current.temperature_2m}°C`;
  humidity.innerText = `Humidité ambiante : ${weather.current.relative_humidity_2m} %`;


}
