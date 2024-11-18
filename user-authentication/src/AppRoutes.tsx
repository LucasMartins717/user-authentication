import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import NaoEncontrada from "./pages/NaoEncontrada";
import { ContextoProvider } from "./context/contexto";

const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <ContextoProvider>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="*" element={<NaoEncontrada />} />
                </Routes>
            </ContextoProvider>
        </BrowserRouter>
    )
}

export default AppRoutes;