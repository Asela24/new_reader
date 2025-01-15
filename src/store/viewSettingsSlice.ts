import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


export interface InitialState {
  pageSize: number;
}

const initialState: InitialState = {
  pageSize: 100,
};

export const viewSettingsSlice = createSlice({
  name: "view-settings",
  initialState,
  reducers: {
    changePageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { changePageSize } = viewSettingsSlice.actions;
export const selectPageSize = (state: RootState) => state.viewSettings.pageSize

export default viewSettingsSlice.reducer;