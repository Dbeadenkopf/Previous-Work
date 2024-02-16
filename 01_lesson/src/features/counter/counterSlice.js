import { createSlice } from "@reduxjs/toolkit";

// this is our initial state
const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // reducer is where all of our actions are being performed
  // if we want to add more actions, just add it to this
  // reducer object
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload; // increment by an amount given as an action
    },
  },
});

export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
