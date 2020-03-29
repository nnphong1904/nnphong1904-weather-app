import React, { useState } from 'react';
import '../src/assets/css/App.css';
import CurrentWeather from './components/CurrentWeather';
const API_KEY = 'AYht5xq9k0cECs3SFaOkgbQzZASinW8a';
function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleOnSubmit = (event) => {
    setSearchText(searchValue);
    event.preventDefault();
    setSearchValue('');
  };
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
        <CurrentWeather searchText={searchText} apiKey={API_KEY} />
      </main>
    </div>
  );
  return content;
}

export default App;
