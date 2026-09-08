const API_KEY ="c0667a161d07d9f5bf678981e471b4bc";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");
const weatherResult = document.getElementById("weatherResult");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    // Input validation
    if (city === "") {
        showError("Please enter a city name.");
        weatherResult.style.display = "none";
        return;
    }

    if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
        showError("Please add your OpenWeatherMap API key in script.js.");
        return;
    }

    await getWeather(city);
});

async function getWeather(city) {
    clearError();
    loading.style.display = "block";
    weatherResult.style.display = "none";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        // Handle HTTP/API errors
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please enter a valid city name.");
            }

            if (response.status === 401) {
                throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
            }

            throw new Error("Unable to fetch weather data. Please try again.");
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        // Network errors + API errors
        console.error("Weather API error:", error);
        showError(error.message || "Something went wrong. Check your internet connection.");
    } finally {
        loading.style.display = "none";
    }
}

function displayWeather(data) {
    document.getElementById("cityName").textContent =
        `${data.name}, ${data.sys.country}`;

    document.getElementById("date").textContent =
        new Date().toLocaleString();

    document.getElementById("temperature").textContent =
        `${Math.round(data.main.temp)}°C`;

    document.getElementById("condition").textContent =
        data.weather[0].description;

    document.getElementById("humidity").textContent =
        `${data.main.humidity}%`;

    document.getElementById("wind").textContent =
        `${data.wind.speed} m/s`;

    document.getElementById("feelsLike").textContent =
        `${Math.round(data.main.feels_like)}°C`;

    document.getElementById("visibility").textContent =
        `${(data.visibility / 1000).toFixed(1)} km`;

    const icon = data.weather[0].icon;
    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById("weatherIcon").alt =
        data.weather[0].description;

    weatherResult.style.display = "block";
}

function showError(message) {
    errorMessage.textContent = message;
}

function clearError() {
    errorMessage.textContent = "";
}

