const apiKey = 'c72ea0fef69678c82612336fa90d8ad6';
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-info');
const weatherIcon = document.getElementById("icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity")
const windSpeed = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");

async function fetchWeather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();

        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

        errorMessage.classList.add('hidden');
    }
    catch(error){
            errorMessage.classList.remove('hidden');                                                                                                                                  
            console.log('Error Fetching weather data: ', error)
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim()
    if(city){
        fetchWeather(city)
    }
    else{
        alert("Please enter a city name.");
    }
});

cityInput.addEventListener("keypress", (e) => {
    if(e.key == 'Enter'){
        const city = cityInput.value.trim()
        if(city){
            fetchWeather(city)
        }
        else{
            alert("Please enter a city name.");
        }
    }
});