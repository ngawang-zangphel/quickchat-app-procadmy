import {createSlict} from "@reduxjs/toolkit";

const loaderSlice = createSlict({
    //StateName
    name: 'loader',
    //Initial value
    initialState: false,
    //Action using which we can update the state
    reducers: {
        //whenever showLoader is called, it will update that loader action value to true
        showLoader: (state) => { state.loader = true; },
        hideLoader: (state) => { state.loader = false; }
    }
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;

//Example: useState
/*
    const [user, setUser] = useState(null);

    here:
        1. StateName: user
        2. InitialState value: null
        3. action/reducers: setUser
*/