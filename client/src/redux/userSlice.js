import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    //StateName
    name: 'user',
    //Initial value
    initialState: { user: null, allUsers: [] },
    //reducers using which we can update the state using the value from action.payload
    reducers: {
        setUser: (state, action) => { state.user = action.payload; },
        setAllUsers: (state, action) => { state.allUsers = action.payload; }
    }
});

export const { setUser, setAllUsers } = usersSlice.actions;

export default usersSlice.reducer;