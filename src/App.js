import React from 'react';
import '../src/assets/css/App.css';
const API_KEY = 'AYht5xq9k0cECs3SFaOkgbQzZASinW8a';
function App() {
  const content = (
    <div className="App">
      <main>
        <div className="search-box">
          {' '}
          <input className="search-bar" type="text" placeholder="Search..." />
        </div>
      </main>
    </div>
  );
  return content;
}

export default App;
