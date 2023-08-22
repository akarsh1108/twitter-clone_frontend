import { createSlice } from '@reduxjs/toolkit';
import appApi from '../services/appApi';

export const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled,(state,{payload}) =>{
            console.log("signupUser fulfilled payload:", payload);
           return payload} );
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled,(state,{payload}) => {
            console.log("signupUser fulfilled payload:", payload);
           return payload});
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled,()=>null);

    },
});

export const {addNotifications, resetNotifications} = userSlice.actions;
export default userSlice.reducer;

