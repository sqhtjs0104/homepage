import { configureStore } from "@reduxjs/toolkit";

import WeatherSlice from "./assets/slices/WeatherSlice";

const store = configureStore({
    reducer: {
        WeatherSlice: WeatherSlice
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ serializableCheck: false, }),],
});

export default store;