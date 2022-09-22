class WeatherApi
{
    endpoint;
    apiKey;

    constructor (_apiKey)
    {
        this.endpoint = "https://api.openweathermap.org/data/2.5/onecall"
        this.apiKey = _apiKey;
    }

    getTemperature(location)
    {
        const params = new URLSearchParams({
            appid: this.apiKey,
            lat: location.lat,
            lon: location.lon,
            units: 'metric'
        })

        return fetch (this.endpoint + '?' + params)
            .then(response => response.json(response))
    }
}