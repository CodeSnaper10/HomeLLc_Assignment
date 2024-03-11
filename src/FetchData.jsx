import React, { useState } from 'react';
import weatherImage from './weather.png';

const FetchData = ({ onToggleFetchData, apiData, fetchData }) => {
  const [searchLoc, setSearchLoc] = useState('');
  const [showSearchTab, setShowSearchTab] = useState(false);

  const toggleSearchTab = () => {
    if (searchLoc) {
      fetchData(searchLoc);
    } else {
      setShowSearchTab(!showSearchTab);
    }
  };

  const handleSearchChange = (e) => {
    setSearchLoc(e.target.value);
  };

  const lastUpdatedTime = apiData?.current?.last_updated;

  const getNextFourHours = (time) => {
    const nextFourHours = [];
    const currentTime = new Date(time);
    for (let i = 1; i <= 4; i++) {
      const nextHour = new Date(currentTime.getTime() + (i * 60 * 60 * 1000));
      nextFourHours.push(nextHour);
    }
    return nextFourHours;
  };

  const nextFourHours = getNextFourHours(lastUpdatedTime);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <div className="menu-icon" onClick={onToggleFetchData}>
          <div className="bar1"></div>
          <div className="bar2"></div>
        </div>
        <div className="search-container">
          <button className="search-icon" onClick={toggleSearchTab}>
            <i className="fa fa-search"></i>
          </button>
          {showSearchTab && (
            <input
              type="text"
              value={searchLoc}
              onChange={handleSearchChange}
              placeholder="Enter location"
            />
          )}
        </div>
      </div>
      <div className='city-details'>
        <div className='city-info'>
          <div className='city-name'>
            {apiData?.location.name},<br></br>{apiData?.location.country}
          </div>
          <div className='date'>
            {apiData && apiData.current.last_updated.split(" ")[0] && formatDate(apiData.current.last_updated.split(" ")[0])}
          </div>
          <div className='weather-icon'>
            <img src={`https:${apiData?.current?.condition.icon}`} alt="Weather Icon" className='icon-img'/>
            <span>{apiData?.current?.condition.text}</span>
          </div>
        </div>
        <div className='city-image'>
          <img src={weatherImage} alt='city-image' />
        </div>
      </div>
      <button onClick={onToggleFetchData} className='live-icon'>LIVE</button>
      <div className='weather-predictor'>
        <div className='current-weather'>
          <div>{apiData?.current?.last_updated.split(" ")[1]}</div>
          <div><img src={`https:${apiData?.current?.condition.icon}`} alt='weather-icon' /></div>
          <div>{apiData?.current?.temp_c}℃</div>
        </div>
        <hr></hr>
        {nextFourHours.map((hour, index) => {
          const nextHourData = apiData && apiData.forecast && apiData.forecast.forecastday[0].hour.find(hourData => {
            const hourStr = hour.getHours().toString().padStart(2, '0');
            return hourData.time.split(" ")[1].startsWith(hourStr);
          });
          return (
            <div className='weather-hour' key={index}>
              <div>{hour.getHours().toString().padStart(2, '0')}:00</div>
              <img src={`https:${nextHourData && nextHourData.condition.icon}`} alt='weather-icon' />
              <div>{nextHourData && nextHourData.temp_c}℃</div>
            </div>
          );
        })}
      </div>  
      <hr></hr>
      <div className='additional-info'>
        <h2>Additional Info</h2>
        <div className='additional-info-item'>
          <div className='Precipitation-data'>
            <p className='Precipitation'>Precipitation</p>
            <div>{apiData?.current?.uv}</div>
          </div>
          <div className='Humidity-data'>
            <p className='humidity'>Humidity</p>
            <div>{apiData?.current?.humidity}</div>
          </div>
          <div className='Windy-data'>
            <p className='windy'>Windy</p>
            <div>{apiData?.current?.wind_kph}km/h</div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className='temprature-details'>
        <div className='temp-head'>Temprature</div>
        <div className='month-selector'>
          <select id="mySelect" className='month-selector'>
            <option value="option1">Last Month</option>
            <option value="option2">Yesterday</option>
            <option value="option3">Today</option>
          </select>
        </div>
      </div>
      <div className='wave'></div>
    </div>
  );
};

export default FetchData;
