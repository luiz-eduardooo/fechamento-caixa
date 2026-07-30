import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginComponent from "../components/auth/LoginComponent"
import AuthenticateRoute from "./AuthenticateRoute"
import AppLayout from "../components/layout/AppLayout"
import FechamentoDoDia from "../components/fechamento/FechamentoDoDia"
import HistoricoDetalhe from "../components/historico/HistoricoDetalhe"
import HistoricoList from "../components/historico/HistoricoList"
import BoletosPage from "../components/boletos/BoletosPage"
import CofrePage from "../components/cofre/CofrePage"
import FuncionariosPage from "../components/auth/FuncionariosPage"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />

        <Route element={<AuthenticateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<FechamentoDoDia />} />
            <Route path="/fechamento" element={<FechamentoDoDia />} />
            <Route path="/historico" element={<HistoricoList />} />
            <Route path="/historico/:id" element={<HistoricoDetalhe />} />
            <Route path="/boletos" element={<BoletosPage />} />
            <Route path="/cofre" element={<CofrePage />} />
            <Route path="/funcionarios" element={<FuncionariosPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router