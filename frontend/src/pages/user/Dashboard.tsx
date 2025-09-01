
import Header from '../../components/Header'
import WelcomMsg from '../../components/WelcomeMsg'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen overflow-auto  flex flex-col'>
      <Header />
      <WelcomMsg />
      <Outlet/>
    </div>
  )
}

export default Dashboard
