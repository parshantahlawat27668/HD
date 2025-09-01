import axios from "axios";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { setNotes } from "../store/notesSlice";
import { useDispatch } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";

interface NoteLinkProps{
  title:string,
  id:string
}
const NoteLink:React.FC<NoteLinkProps> = ({title, id}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (id:string) =>{
    console.log(id);
    console.log(title);
    navigate("/dashboard/note",{state:{_id:id}});
  }

    const handleDelete = (_id:string,e:React.MouseEvent)=>{
      e.stopPropagation();
    setLoading(true);
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/note/delete/${_id}`,{withCredentials:true})
    .then((response)=>{
      toast.success(response.data.message);
      dispatch(setNotes(response.data.data.notes));
      setLoading(false);
    })
    .catch((error)=>{
      toast.error(error.response.data.message);
    })
  }
  return (
    <div className='border-[2px] border-[#00000035] rounded-lg p-3 flex flex-row items-center justify-between my-3 shadow-lg cursor-pointer' onClick={()=>handleClick(id)}>
      <p>{title}</p>
      {
        loading ? 
        <ImSpinner9  className='mx-auto animate-spin' /> :
        <RiDeleteBin6Line onClick={(e)=>handleDelete(id,e)} className="cursor-pointer"/>
      }
    </div>
  )
}

export default NoteLink
