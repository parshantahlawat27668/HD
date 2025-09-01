import { useSelector } from 'react-redux'
import type { RootState } from '../store';

const WelcomeMsg = () => {
  const user = useSelector((state:RootState)=>state.user.activeUser);
  return (
    <div className='w-auto border-[2px] border-[#00000034] rounded-md mx-2 px-3 py-5 my-3'>
      <h3 className='text-xl font-semibold mb-1'>Welcome, {user?.name} !</h3>
      <p className='text-sm'>{user?.email.id}</p>
    </div>
  )
}

export default WelcomeMsg
