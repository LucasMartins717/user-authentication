import axios from "axios";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface interfaceContexto {
    users: { id: number, username: string }[];
    setUsers: (users: { id: number, username: string }[]) => void;
}

export const Contexto = createContext<interfaceContexto | null>(null);
Contexto.displayName = "usersContext";

export const ContextoProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [users, setUsers] = useState<interfaceContexto['users']>([]);

    // GET USERS DATA
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<interfaceContexto['users']>('http://localhost:3030/users');
                setUsers(response.data);
            } catch (err) {
                console.error('Error trying to connect API: ' + err)
            }
        }

        fetchUser();
    }, []);

    return (
        <Contexto.Provider value={{
            users,
            setUsers,
        }}>
            {children}
        </Contexto.Provider>
    )
}

export const useUserContexto = () => {
    const contexto = useContext(Contexto);
    if (!contexto) {
        throw new Error("Context error!");
    }
    return contexto;
}