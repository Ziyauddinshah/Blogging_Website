import { createSlice } from "@reduxjs/toolkit";
const itemSlice = createSlice({
  name: "post",
  initialState: {
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ],
  },
  reducers: {
    addItem: (state, action) => {
      return { ...state, items: [...state.items, action.payload] };
    },
    deleteItem: (state, action) => {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    },
  },
});

export const { addItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;
