import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoggedIn : false,
    email : null,
    userId : null
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setActiveUser(state, action){
            console.log(action.payload);
            const {email,userId} = action.payload;
            state.isLoggedIn=true;
            state.email=email;
            state.userId=userId;
        },
        removeActiveUser(state,action){
            state.isLoggedIn= false;
            state.email= null;
            state.userId = null;
            // console.log(state.isLoggedIn);
        }
    }
})

export const {setActiveUser, removeActiveUser} = authSlice.actions;

export default authSlice.reducer;
