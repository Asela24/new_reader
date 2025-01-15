import { configureStore } from "@reduxjs/toolkit";
import viewSettingsReducer from './viewSettingsSlice'

export const store = configureStore({
    reducer: {
        viewSettings: viewSettingsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store