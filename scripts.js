const apiKey = '6557810176c36fac5f0db536711a6c52';
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data: ' + error.message));
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data: ' + error.message));
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');

    if (data && data.weather && data.weather.length > 0) {
        weatherDataDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherDataDiv.innerHTML = `
            <p>Error fetching weather data. Please try again.</p>
        `;
    }
}
