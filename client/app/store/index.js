import { configureStore } from "@reduxjs/toolkit";

// reducers
import quotesReducer from "../features/quotesSlice"
import usersReducer from "../features/usersSlice"

const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    user: usersReducer
  },
  preloadedState: {},
});

export default store;
