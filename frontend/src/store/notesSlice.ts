import { createSlice } from "@reduxjs/toolkit";


export interface INote{
    _id:string,
    title:string,
    note:string
}

export type INotes = INote[] | [];

const initialState:INotes = [];

const notesSlice = createSlice({
    name:"notes",
    initialState:initialState,
    reducers:{
        setNotes:(state, action)=>{
            return action.payload;
        }
    }

});

export const {setNotes} = notesSlice.actions;
export default notesSlice.reducer;