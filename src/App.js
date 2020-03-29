import React, { useState, useEffect } from 'react';
import '../src/assets/css/App.css';
import CurrentWeather from './components/CurrentWeather';
import axios from 'axios';
const API_KEY = 'AYht5xq9k0cECs3SFaOkgbQzZASinW8a';
function App() {
  // state declaration
  const [searchValue, setSearchValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  // extra function
  const fetch = async (url) => {
    // fetch function for fetching data and return promise
    const response = await axios.get(url);
    return response;
  };
  const dayBuilder = () => {
    // day builder function to get the time with the format Sunday 13 March 2020
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
  // fetching data
  useEffect(() => {
    console.log('useEffect running...');
    if (searchText === '') {
      if (navigator.geolocation) {
        console.log('yes');
      }
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        // get the location key
        fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${position.coords.latitude}%2C${position.coords.longitude}`
        ).then((res) => {
          const position = res.data.LocalizedName;
          fetch(
            // fetch current weather data
            `https://dataservice.accuweather.com/currentconditions/v1/${res.data.Key}?apikey=${API_KEY} `
          ).then((res) => {
            const date = dayBuilder();
            // if (res.data[0].Temperature.Metric.Value > 25) setIsColdBg(false);
            setCurrentWeatherData({ ...res.data[0], date, position });
          });
        });
      });
      console.log('fetching done!');
    } else {
      // fetch data to key location key by the value typed in search box
      fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${searchText}`
      ).then((res) => {
        const locationKey = res.data[0].Key;
        const position = res.data[0].LocalizedName;
        fetch(
          // fetch current weather data
          `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY} `
        ).then((res) => {
          const date = dayBuilder();
          // if (res.data[0].Temperature.Metric.Value > 25) setIsColdBg(false);
          setCurrentWeatherData({ ...res.data[0], date, position });
        });
      });
    }
  }, [searchText]);
  // handle event of search box
  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleOnSubmit = (event) => {
    setSearchText(searchValue);
    event.preventDefault();
    setSearchValue('');
  };
  // rendering content
  const content = (
    <div
      className={
        currentWeatherData.Temperature !== undefined
          ? currentWeatherData.Temperature.Metric.Value > 22
            ? 'App warm'
            : 'App'
          : 'App'
      }
    >
      <main>
        <div className="search-box">
          {' '}
          <form onSubmit={handleOnSubmit}>
            <input
              onChange={handleOnChange}
              className="search-bar"
              type="text"
              placeholder="Search..."
              value={searchValue}
            />
          </form>
        </div>
        <CurrentWeather data={currentWeatherData} />
      </main>
    </div>
  );
  return content;
}

export default App;
