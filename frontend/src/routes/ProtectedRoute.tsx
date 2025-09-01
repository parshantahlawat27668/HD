
import type React from 'react';
import type {ReactNode} from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store';

interface ProtectedRouteProps {
    children:ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const user = useSelector((state:RootState)=>state.user.activeUser);
  return user ? <>{children}</> : < Navigate to="/auth/signin" replace/>
}

export default ProtectedRoute
