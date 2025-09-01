import React, { type ReactNode } from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Navigate } from 'react-router-dom';


interface PublicRouteProps {
    children:ReactNode;
}

const PublicRoute:React.FC<PublicRouteProps> = ({children}) => {
  const user = useSelector((state:RootState)=>state.user.activeUser);
  return user ? <Navigate to="/dashboard" replace/> : children;
}

export default PublicRoute
