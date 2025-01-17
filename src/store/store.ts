import { combineReducers, configureStore } from "@reduxjs/toolkit";
import viewSettingsReducer, { updateCookieMiddleware } from './viewSettingsSlice'

export const rootReducer = combineReducers({
    viewSettings: viewSettingsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(updateCookieMiddleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store