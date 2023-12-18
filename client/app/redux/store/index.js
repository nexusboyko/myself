import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import quotesReducer from "../features/quotesSlice"
import usersReducer from "../features/usersSlice"

const rootReducer = combineReducers({ 
  quotes: quotesReducer, 
  user: usersReducer
});

const persistConfig = {
  key: "root",
  storage, // FIXME: ? defaults to localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
