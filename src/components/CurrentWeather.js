import React, { useState, useEffect } from 'react';
import axios from 'axios';
function CurrentWeather(props) {
  const fetch = async (url) => {
    const response = await axios.get(url);
    return response;
  };
  const dayBuilder = () => {
    const date = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const day = new Date();
    return `${date[day.getDay()]} ${day.getDate()} ${
      month[day.getMonth()]
    } ${day.getFullYear()} `;
  };
  const { apiKey } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/328328?apikey=${apiKey} `
    ).then((res) => {
      setWeatherData(res.data[0]);
      setIsLoading(false);
    });
  }, []);
  const content = (
    <div className="current-weather-container">
      {isLoading && <div>IS LOADING...</div>}
      {!isLoading && (
        <>
          <div className="location-box">
            <div className="location">LONDON</div>
            <div className="date">{dayBuilder()}</div>
            <div className="degree">
              {`${parseInt(weatherData.Temperature.Metric.Value)}°C`}
            </div>
            <div className="weather">{weatherData.WeatherText}</div>
          </div>
        </>
      )}
    </div>
  );
  return content;
}
export default CurrentWeather;
