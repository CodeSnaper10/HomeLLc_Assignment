import React, { useState, useEffect } from 'react';
import './App.css';
import Imagepage from './Imagepage';
import FetchData from './FetchData';

const App = () => {
  const [apiData, setApiData] = useState(null);
  const [showFetchData, setShowFetchData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=New York&days=3';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '73e1864bb1msh876644e6ba79155p17d47ejsn2ffca3de5ba7',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setApiData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleToggleFetchData = () => {
    setShowFetchData(!showFetchData);
  };

  return (
    <div className='container'>
      {apiData ? (
        showFetchData ? (
          <FetchData onToggleFetchData={handleToggleFetchData} apiData={apiData} />
        ) : (
          <Imagepage onToggleFetchData={handleToggleFetchData} apiData={apiData} />
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
