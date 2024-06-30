import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedules: {},
};

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    setSchedule(state, action) {
      const { fileName, data } = action.payload;
      state.schedules[fileName] = data;
    },
    removeSchedule(state, action) {
      const fileName = action.payload;
      delete state.schedules[fileName];
    },
  },
});

export const { setSchedule, removeSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
