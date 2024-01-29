import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./reducer/playerSlice";
import todoSlice from "./reducer/todoSlice";

const store = configureStore({
  reducer: { playerSlices: playerSlice, todo: todoSlice },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
