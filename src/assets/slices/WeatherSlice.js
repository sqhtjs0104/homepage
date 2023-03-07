import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { pending, fulfilled, rejected } from '../js/ReduxHelper';

export const getWeather = createAsyncThunk('WeatherSlice/getWeather', async (payload, { rejectWithValue }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${payload.lat}&lon=${payload.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

    let data = null;
    try {
        const response = await axios.get(url);
        data = {
            name: response.data.name,
            weather: response.data.weather[0],
            temp: response.data.main.temp
        }
    } catch (err) {
        return rejectWithValue(err.response);
    }

    return data;
});

const WeatherSlice = createSlice({
    name: 'WeatherSlice',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: {
        [getWeather.pending]: pending,
        [getWeather.fulfilled]: fulfilled,
        [getWeather.rejected]: rejected,
    }
});

export const { } = WeatherSlice.actions;

export default WeatherSlice.reducer;