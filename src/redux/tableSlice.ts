import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Row {
  id: string;
  name: string;
  email: string;
  contact: string;
  weekdays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
  gender: string;
  dob: string;
}
interface TableState {
  data: Row[];
}

const initialState: TableState = {
  data: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<Row>) => {
      state.data.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<{ id: string; data: Row }>) => {
      const { id, data } = action.payload;
      const index = state.data.findIndex((row) => row.id === id);
      if (index !== -1) {
        state.data[index] = data;
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((row) => row.id !== action.payload);
    },
  },
});

export const { addRow, updateRow, deleteRow } = tableSlice.actions;
export default tableSlice.reducer;
