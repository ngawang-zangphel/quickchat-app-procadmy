import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    //StateName
    name: 'user',
    //Initial value
    initialState: { user: null },
    //reducers using which we can update the state using the value from action.payload
    reducers: {
        setUser: (state, action) => { state.user = action.payload; },
    }
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;