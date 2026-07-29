import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginComponent from "../components/auth/LoginComponent"
import AuthenticateRoute from "./AuthenticateRoute"
import CriarFechamentoComponent from "../components/api/CriarFechamentoComponent"

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginComponent/>}></Route>
      <Route element={<AuthenticateRoute/>}>
      <Route path="/fechamento/criar" element={<CriarFechamentoComponent/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Router
