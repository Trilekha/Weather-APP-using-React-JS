import './App.css';
import Search from './components/search/search'
import { Forecast } from './components/forecast/forecast';
import CurrentWeather from './components/currentWeather/currentWeather';
import { currentWeatherAPIURL, weather_API_Key } from './api'
import { useState } from 'react';
function App() {
  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${currentWeatherAPIURL}/weather?lat=${latitude}&lon=${longitude}&appid=${weather_API_Key}&units=metric`);
    const forecastFetch = fetch(`${currentWeatherAPIURL}/forecast?lat=${latitude}&lon=${longitude}&appid=${weather_API_Key}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setcurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })

      }).catch((err) => {
        console.log(err);
      });
    console.log(currentWeather);
    console.log(forecast);
  }
  return (
    <div className="Container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
