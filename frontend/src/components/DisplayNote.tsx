import  { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import type { RootState } from '../store';
import axios from 'axios';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';

const DisplayNote = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const notes = useSelector((state:RootState)=>state.notes);
  const location = useLocation();
  const navigate = useNavigate();
  const {_id} = location.state || {};

  const note  = notes.find((note)=>note._id === _id);
  console.log(note);

  const handleBack = ()=>{
    navigate("/dashboard");
  }
  const handleDelete = (_id:string)=>{
    setLoading(true);
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/note/delete/${_id}`,{withCredentials:true})
    .then((response)=>{
      toast.success(response.data.message);
      setLoading(false);
      navigate("/dashboard");
    })
    .catch((error)=>{
      toast.error(error.response.data.message);
    })
  }
  return (
    <div className='flex flex-1 w-full flex-col'>
              <div className='flex flex-row '>
                <button className='bg-blue-500 text-white p-1 py-[8px] rounded-md text-sm font-semibold w-auto mx-2 mb-7 flex-1 cursor-pointer' onClick={handleBack}>Back</button>
                <button disabled={loading} className='bg-red-500 text-white p-1 py-[8px] rounded-md text-sm font-semibold w-auto mx-2 mb-7 flex-1 cursor-pointer' onClick={()=>handleDelete(_id)}>
                  {
                    loading ?
                    <ImSpinner9 size={20} className='mx-auto animate-spin' /> :
                    "Delete"
                  }
                  </button>
              </div>
              <div className='border-[1px] border-[#00000055] rounded-xl flex-1 m-2'>
        <h3 className='  m-1 outline-none   p-2 text-2xl font-bold'>
          {note?.title}

          </h3>
        <p className='w-auto m-1 flex-1 outline-none  p-2  text-md'>
          {
            note?.note
          }
 
        </p>
              </div>
    </div>
  )
}

export default DisplayNote
