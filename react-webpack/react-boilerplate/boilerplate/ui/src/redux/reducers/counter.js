import * as actions from "../actions/counter";
import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
  count: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setCount, (state, action) => {
      state.count = action.payload;
    })
    .addCase(actions.clearCount, (state) => {
      state.count = 0;
    });
});

export default reducer;
