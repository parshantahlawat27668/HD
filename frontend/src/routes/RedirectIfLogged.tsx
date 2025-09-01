import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

const RedirectIfLogged = () => {
  const user = useSelector((state:RootState)=>state.user.activeUser);
  return user ? <Navigate to="/dashboard" replace/> : <Navigate to="/auth/signin" replace/>;
}

export default RedirectIfLogged;
