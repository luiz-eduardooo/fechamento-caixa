import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginComponent from "../components/auth/LoginComponent"
import AuthenticateRoute from "./AuthenticateRoute"
import FechamentoDoDia from "../components/fechamento/FechamentoDoDia"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />

        <Route element={<AuthenticateRoute />}>
          <Route path="/" element={<FechamentoDoDia />} />
          <Route path="/fechamento" element={<FechamentoDoDia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router