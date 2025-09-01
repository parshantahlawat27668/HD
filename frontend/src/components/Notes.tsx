import React, { useEffect } from 'react'
import NoteLink from './NoteLink'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store';
import axios from 'axios';
import { setNotes, type INote, type INotes } from '../store/notesSlice';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes:INotes = useSelector((state:RootState)=>state.notes);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/note`,{withCredentials:true})
    .then((response)=>{
      dispatch(setNotes(response.data.data.notes));
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])

  const createNoteHandler = ():void =>{
    navigate("/dashboard/create-note");
  }

  return (
    <div className='w-auto mx-2 flex-1 rounded-2xl flex flex-col'>
            <button className='bg-blue-600 text-white p-1 py-[8px] rounded-md text-sm font-semibold w-auto mx-2 mb-7 cursor-pointer' type='submit' onClick={createNoteHandler}>Create Note</button>
      <p className='p-1'>Notes</p>
      <div className='overflow-auto w-full'>
        {
          Array.isArray(notes) && 
          notes?.map((note:INote)=>{
             return <NoteLink key={note._id} title = {note.title} id = {note._id}/>
            } )
        }
       
      </div>
    </div>
  )
}

export default Notes
