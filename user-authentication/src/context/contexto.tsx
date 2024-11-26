import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface interfaceContexto {
    users: { username: string, token: string } | null;
    setUsers: (users: { username: string, token: string } | null) => void;
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;

    loginUser: (userdata: {username: string, token: string}) => void;
    logoutUser: () => void;
}

export const Contexto = createContext<interfaceContexto | null>(null);
Contexto.displayName = "usersContext";

export const ContextoProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [users, setUsers] = useState<interfaceContexto['users'] | null>(null);
    const [isLogged, setIsLogged] = useState<interfaceContexto['isLogged']>(false);

    useEffect(() => {
        const storageUser = localStorage.getItem('userData');
        if(storageUser){
            const user = JSON.parse(storageUser);
            setUsers(user);
            setIsLogged(true);
        }
    }, [])

    const loginUser = (userData: {username: string, token: string}) => {
        setIsLogged(true);
        setUsers(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('logado!')
    }

    const logoutUser = () => {
        setIsLogged(false);
        setUsers(null);
        localStorage.removeItem('userData');
        console.log('deslogado!')
    }

    return (
        <Contexto.Provider value={{
            users,
            setUsers,
            isLogged,
            setIsLogged,
            loginUser,
            logoutUser,
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