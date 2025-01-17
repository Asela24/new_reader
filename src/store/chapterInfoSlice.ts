import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitialState {
    currentPage: number | null
}

const initialState: InitialState = {
    currentPage: null
}

export const chapterInfoSlice = createSlice({
    name: 'chapter-info',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
    }
})