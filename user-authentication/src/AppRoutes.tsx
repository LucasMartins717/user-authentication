import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import NaoEncontrada from "./pages/NaoEncontrada";
import { ContextoProvider } from "./context/contexto";
import Registro from "./pages/Registro";
import Login from "./pages/Login";

const AppRoutes: FC = () => {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ContextoProvider>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/register" element={<Registro />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NaoEncontrada />} />
                    </Routes>
            </ContextoProvider>
        </BrowserRouter>
    )
}

export default AppRoutes;