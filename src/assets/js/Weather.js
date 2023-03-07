import axios from 'axios';

class Weather {
    static #current = null;

    static getInstance() {
        if (Weather.#current === null) {
            Weather.#current = new Weather();
        }

        return Weather.#current;
    }

    data = null;

    async onGeoSuccess(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

        try {
            const response = await axios.get(url);
            Weather.data = {
                name: response.data.name,
                weather: response.data.weather[0],
                temp: response.data.main.temp
            }
        } catch (err) {
            alert("Can't get weather info. Check a Error log");
            console.error(err);
        }
    }

    onGeoError() {
        alert("Can't find your location. Weather info couldn't provided. :(");
    }

    option = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: Infinity
    };

    getWeather() {
        navigator.geolocation.getCurrentPosition(this.onGeoSuccess, this.onGeoError, this.option);
    }
}

export default Weather.getInstance();