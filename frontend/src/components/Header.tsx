import axios from 'axios'
import { PiSpinnerBold } from 'react-icons/pi'
import { setUser } from '../store/userSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const Header = () => {
  const dispatch = useDispatch();
  const handleSignOut = ()=>{
    axios.patch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`,{},{withCredentials:true})
    .then((response)=>{
      dispatch(setUser(null));
      toast.success(response.data.message);
    })
    .catch((error)=>{
      toast.error(error.response.data.message);
    })
  }
  return (
    <div className='flex flex-row justify-between py-3'>
        <div className='flex items-center gap-3 pl-3'>
      <PiSpinnerBold color='#155dfc' size={23}/>
      Dashboard
        </div>                                                  

        <p className='mr-5 text-sm cursor-pointer underline text-blue-600' onClick={handleSignOut}>Sign out</p>
    </div>
  )
}

export default Header
