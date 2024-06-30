import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  selectedFile: null,
};

const fileManagementSlice = createSlice({
  name: "fileManagement",
  initialState,
  reducers: {
    addFile(state, action) {
      state.files.push(action.payload);
    },
    selectFile(state, action) {
      state.selectedFile = action.payload;
    },
    removeFile(state, action) {
      state.files = state.files.filter((file) => file !== action.payload);
      if (state.selectedFile === action.payload) {
        state.selectedFile = null;
      }
    },
  },
});

export const { addFile, selectFile, removeFile } = fileManagementSlice.actions;
export default fileManagementSlice.reducer;
