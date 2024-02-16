import { configureStore } from "@reduxjs/toolkit";

import counter from "./reducers/counter";
import movies from "./reducers/movies";

export const store = configureStore({
  reducer: {
    counter,
    movies,
  },
});
