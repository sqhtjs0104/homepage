import { configureStore } from "@reduxjs/toolkit";

import WeatherSlice from "./assets/slices/WeatherSlice";
import ScheduleSlice from "./assets/slices/ScheduleSlice";

const store = configureStore({
    reducer: {
        WeatherSlice: WeatherSlice,
        ScheduleSlice: ScheduleSlice
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ serializableCheck: false, }),],
});

export default store;