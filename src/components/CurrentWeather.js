import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/CurrentWeather.css';
function CurrentWeather(props) {
  const { searchText, apiKey } = props;
  const fetch = async (url) => {
    const response = await axios.get(url);
    return response;
  };
  const getX = (x) => x;
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
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [location, setLocation] = useState('');
  useEffect(() => {
    // fetch data of current position when open app first time
    if (searchText === '') {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${position.coords.latitude}%2C${position.coords.longitude}`
        ).then((res) => {
          setLocation(res.data.LocalizedName);
          fetch(
            `https://dataservice.accuweather.com/currentconditions/v1/${res.data.Key}?apikey=${apiKey} `
          ).then((res) => {
            setWeatherData(res.data[0]);
            setIsLoading(false);
          });
        });
      });
    }
    // fetch(
    //   `https://dataservice.accuweather.com/currentconditions/v1/328328?apikey=${apiKey} `
    // ).then((res) => {
    //   setWeatherData(res.data[0]);
    //   setIsLoading(false);
    // });
  }, []);
  const content = (
    <div className="current-weather-container">
      {!isLoading && (
        <>
          <div className="location-box">
            <div className="location">{location}</div>
            <div className="date">{dayBuilder()}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
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
