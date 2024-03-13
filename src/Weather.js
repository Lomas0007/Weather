import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    width: 94%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

const Button = styled.input`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 8px 15px;
    cursor: pointer;
`;

function Weather() {
    const [Weather, setWeather] = React.useState(null);
    const [city, setCity] = React.useState("");

    function saveData() {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b886f7fdc275f981386aceffa46e68a5`)
            .then(response => {
                if (response.data.weather && response.data.weather.length > 0) {
                    setWeather(response.data);
                } else {
                    alert("Weather data not available");
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }

    return (
        <>
            <WeatherContainer>
                <Input type='text' onChange={(e) => setCity(e.target.value)} />
                <Button type='button' onClick={saveData} value='submit' /><br />
                {Weather && (
                <>
                    <h4>Weather: {Weather.weather[0].description}</h4>
                    <h4>Temperature: {Weather.main.temp}</h4>
                    <h4>Visibility: {Weather.visibility}</h4>
                </>
            )}
            </WeatherContainer>
        </>
    )
}
export default Weather;