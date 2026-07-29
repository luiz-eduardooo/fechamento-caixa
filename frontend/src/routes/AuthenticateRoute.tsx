import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const AuthenticateRoute = () => {
    const {usuario}:any = useAuth();

    if(usuario == null) return <Navigate to={"/login"}/>

  return (
    <Outlet/>
  )
}

export default AuthenticateRoute
