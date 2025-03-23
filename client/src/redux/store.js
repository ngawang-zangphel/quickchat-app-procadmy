import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import usersReducer from './userSlice';

const store = configureStore({
    //Storing only 1 state
    reducer: { 
        loaderReducer,
        usersReducer
    }
});

export default store;