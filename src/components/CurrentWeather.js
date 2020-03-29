import React from 'react';
import '../assets/css/CurrentWeather.css';
function CurrentWeather(props) {
  console.log('Current weather running...');
  const { data } = props;
  const content = (
    <>
      {Object.entries(data).length !== 0 && (
        <>
          <div className="location-box">
            <div className="location">{data.position}</div>
            <div className="date">{data.date}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {`${parseInt(data.Temperature.Metric.Value)}°C`}
            </div>
            <div className="weather">{data.WeatherText}</div>
          </div>
        </>
      )}
    </>
  );
  return content;
}
export default React.memo(CurrentWeather);
