import { createAction } from "@reduxjs/toolkit";

// synchronous action
export const setCount = createAction("counter/setCount");

export const clearCount = createAction("counter/clearCount");
