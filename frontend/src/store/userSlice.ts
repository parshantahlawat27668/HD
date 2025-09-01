import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface IEmail {
  id: string;
  isVerified: boolean;
}

interface IUser{
    _id:string,
    name:string,
    email:IEmail,
    DOB:Date
}

interface UserSlice{
    activeUser:IUser | null;
}



const initialState:UserSlice = {
    activeUser:null,
}


const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUser:(state, action:PayloadAction<IUser | null>)=>{
            state.activeUser = action.payload;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;