import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import NaoEncontrada from "./pages/NaoEncontrada";

const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NaoEncontrada />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;