import React, { useState, useEffect } from 'react';
import '../src/assets/css/App.css';
import CurrentWeather from './components/CurrentWeather';
import axios from 'axios';
const API_KEY = 'AYht5xq9k0cECs3SFaOkgbQzZASinW8a';
function App() {
  // state declaration
  const [searchValue, setSearchValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  // extra function
  const fetch = async (url) => {
    // fetch funtion for fetching data and return promise
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
    if (searchText === '') {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${position.coords.latitude}%2C${position.coords.longitude}`
        ).then((res) => {
          const position = res.data.LocalizedName;
          setLocation(res.data.LocalizedName);
          fetch(
            `https://dataservice.accuweather.com/currentconditions/v1/${res.data.Key}?apikey=${API_KEY} `
          ).then((res) => {
            const date = dayBuilder();
            setCurrentWeatherData({ ...res.data[0], date, position });
            setIsLoading(false);
          });
        });
      });
    } else {
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
    <div className="App">
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
