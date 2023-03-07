import React, { memo, useCallback, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getWeather } from '../assets/slices/WeatherSlice';

import '../assets/css/weather.min.css';

const Weather = memo(() => {
  const { data, loading } = useSelector(state => state.WeatherSlice);
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState(null);

  const onGeoSuccess = useCallback((position) => {
    const temp = {
      lat : position.coords.latitude,
      lon : position.coords.longitude
    };
    setCurrentLocation(temp);
  });

  const onGeoError = useCallback(() => {
    alert('위치 정보 획득에 실패했습니다.');
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: Infinity
    });
  }, []);

  useEffect(() => {
    if (!currentLocation) return;
    dispatch(getWeather(currentLocation));
  }, [currentLocation]);

  useEffect(() => {
    if (!data) return;

  }, [data]);

  return (
    <div className='weather_wrapper'>
      {
        loading ? (
          <></>
        ) : (
          data ? (
            <>
              <div>
                <img className="weather" src={`http://openweathermap.org/img/wn/${data.weather.icon}.png`} alt='Weather' />
                <span className='temp'>{data.temp}ºC</span>
              </div>
              <p className='place'>{data.name}</p>
            </>
          ) : (
            <></>
          )
        )
      }
    </div>
  );
});

export default Weather;