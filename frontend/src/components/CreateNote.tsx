import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom'

const CreateNote = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const backButtonHandler = () =>{
    navigate("/dashboard");
  }

  const saveButtonHandler = (e: React.FormEvent<HTMLFormElement>)=>{
    setLoading(true);
    e.preventDefault();
    const title =  titleRef.current?.value;
    const note = noteRef.current?.value;
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/note/create`,
      {
        title,
        note
      },
      {withCredentials:true})
      .then((response)=>{
        console.log(response);
        toast.success(response.data.message);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error)=>{
        toast.error(error.response.data.message);     
      })
  }
  return (
    <form className='flex flex-1 w-full flex-col' onSubmit={(e)=>saveButtonHandler(e)}>
              <div className='flex flex-row '>
                <button className='bg-red-500 text-white p-1 py-[8px] rounded-md text-sm font-semibold w-auto mx-2 mb-7 flex-1 cursor-pointer' onClick={backButtonHandler}>Back</button>
                <button disabled={loading} className='bg-blue-500 text-white p-1 py-[8px] rounded-md text-sm font-semibold w-auto mx-2 mb-7 flex-1 cursor-pointer' type='submit'>
                  {
                    loading ?
                    <ImSpinner9 size={20} className='mx-auto animate-spin' /> :
                    "Save"
                  }
                  </button>
              </div>
        <input className='  m-2 outline-none bg-[#00000020]  p-2 text-2xl font-bold' placeholder='Title' ref={titleRef} required></input>
        <textarea className='w-auto m-2 flex-1 outline-none bg-[#00000020] p-2 text-md' placeholder='Enter text here...' ref={noteRef} required>

        </textarea>
    </form>
  )
}

export default CreateNote
