import {
  createSlice,
  Middleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./store";
import { Option } from "../modules/header-nav/components/Selector/Selector";
import { Cookies } from "react-cookie";

export enum ReaderModeType {
  Page = "single",
  Vertical = "vertical",
}

const cookies = new Cookies();

export interface InitialState {
  pageSize: number;
  readerMode: ReaderModeType;
}

const initialState: InitialState = {
  pageSize: 100,
  readerMode: cookies.get("read_readMode") || ReaderModeType.Vertical,
};

export const viewSettingsSlice = createSlice({
  name: "view-settings",
  initialState,
  reducers: {
    changePageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    changeReaderMode: (
      state,
      action: PayloadAction<ReaderModeType>
    ) => {
      console.log(action.payload)
      state.readerMode = action.payload;
    },
  },
});

export const updateCookieMiddleware: Middleware<
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  {},
  ReturnType<typeof rootReducer>
> = () => (next) => (action) => {
  if (typeof action === "object" && action !== null && "type" in action) {

    if (action.type === viewSettingsSlice.actions.changeReaderMode.type) {

      const newReaderMode = (
        action as unknown as { payload: Option<ReaderModeType> }
      ).payload;

      console.log(newReaderMode)
      cookies.set("read_readMode", newReaderMode.key, { path: "/" });

      console.log(`Cookie updated: readerMode=${newReaderMode}`);
    }
  }

  return next(action);
};

export const { changePageSize, changeReaderMode } = viewSettingsSlice.actions;
export const selectPageSize = (state: RootState) => state.viewSettings.pageSize;

export default viewSettingsSlice.reducer;
