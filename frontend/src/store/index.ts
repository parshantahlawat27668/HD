import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import notesReducer from "./notesSlice"
const store = configureStore({
    reducer:{
        user:userReducer,
        notes:notesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;