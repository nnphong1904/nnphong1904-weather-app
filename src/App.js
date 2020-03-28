import React from 'react';
import '../src/assets/css/App.css';
import CurrentWeather from './components/CurrentWeather';
const API_KEY = 'AYht5xq9k0cECs3SFaOkgbQzZASinW8a';
function App() {
  const content = (
    <div className="App">
      <main>
        <div className="search-box">
          {' '}
          <input className="search-bar" type="text" placeholder="Search..." />
        </div>
        <CurrentWeather apiKey={API_KEY} />
      </main>
    </div>
  );
  return content;
}

export default App;
