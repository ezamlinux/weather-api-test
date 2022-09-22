/*Create new Leaflet MAP*/
const map = L.map('map', {
    center : [46.856613, 2.352222],
    zoom: 6,
    scrollWheelZoom: false,
    dragging: false
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

/* Initiate Weather API*/
const weatherApi = new WeatherApi("539a92a71fbb1b6ee46f8afdfc95bb2e");
const weatherInformationElement = document.getElementById("weather_informations");

/* Create Location's pin*/
const locations = [
    {lat: 48.856613, lon: 2.352222, name: 'Paris'},
    {lat: 43.604652, lon: 1.444209, name: 'Toulouse'},
    {lat: 45.764042, lon: 4.835659, name: 'Lyon'}
];

locations
    .forEach(location => {
        L.marker([location.lat, location.lon])
            .addTo(map)
            .on('click', () => displayTemperature(location))
            .bindPopup(location.name);
    });

const days = [
    'Today',
    'Tomorrow',
    'After tomorrow'
];

/*Update information on Click*/
function displayTemperature (location) {
    weatherInformationElement.querySelector("#weather_informations__title").textContent = "Loading";
    weatherInformationElement.querySelector("#weahter_informations__days").innerHTML = "...";

    weatherApi
        .getTemperature(location)
        .then(response => {
            weatherInformationElement.querySelector("#weather_informations__title").textContent = location.name;

            /*create table structure*/
            weather_days = "<table class=\"u-full-width\">"
                + "<thead><tr><th>Day</th><th>Temp</th></tr></thead>"
                + "<tbody>";

            response.daily.slice(0, 3).forEach( (day, index) => {
                weather_days += "<tr>"
                    + "<td>"+ days[index] +"</td>"
                    + "<td>"+ day.temp.day +"°C</td>"
                    + "</tr>";
            });

            weather_days += "</tbody></table>";

            weatherInformationElement.querySelector("#weahter_informations__days").innerHTML = weather_days;
        });
}
