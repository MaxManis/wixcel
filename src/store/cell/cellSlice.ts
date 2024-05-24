import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CellState {
  selectedCellKey: string | null;
  totalActionsCount: number;
}

const initialState: CellState = {
  selectedCellKey: null,
  totalActionsCount: 0,
};

export const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    setSelectedCell: (state, action: PayloadAction<string | null>) => {
      state.selectedCellKey = action.payload;
    },
    countActions: (state, _action: PayloadAction<undefined>) => {
      state.totalActionsCount = state.totalActionsCount + 1;
    },
  },
});

export const { setSelectedCell, countActions } = cellSlice.actions;
