import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface interfaceContexto {
    users: { id: number, username: string, token: string } | null;
    setUsers: (users: { id: number, username: string, token: string } | null) => void;
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    posts: { id: number, user_id: number, username: string, description: string, created_at: string }[];
    setPosts: (posts: { id: number, user_id: number, username: string, description: string, created_at: string }[]) => void;

    loginUser: (userdata: { username: string, token: string }) => void;
    logoutUser: () => void;
}

export const Contexto = createContext<interfaceContexto | null>(null);
Contexto.displayName = "usersContext";

export const ContextoProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [users, setUsers] = useState<interfaceContexto['users'] | null>(null);
    const [posts, setPosts] = useState<interfaceContexto['posts']>([]);
    const [isLogged, setIsLogged] = useState<interfaceContexto['isLogged']>(false);

    //VERIFICAR SE O USUARIO TA CONECTADO
    useEffect(() => {
        const storageUser = localStorage.getItem('userData');
        if (storageUser) {
            const user = JSON.parse(storageUser);
            setUsers(user);
            setIsLogged(true);
        }
    }, [])

    //PEGAR POSTS DO SERVIDOR
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<interfaceContexto['posts']>('http://localhost:3030/posts');
                setPosts(response.data);
            } catch (err){
                console.error('DEU ERRO: ' + err);
            }
        }
        fetchPosts();
    }, [])

    const loginUser = (userdata: { username: string, token: string }) => {
        const decoded: { id: number, username: string } = jwtDecode(userdata.token);
        const userData = {
            id: decoded.id,
            username: decoded.username,
            token: userdata.token,
        }

        setIsLogged(true);
        setUsers(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    const logoutUser = () => {
        setIsLogged(false);
        setUsers(null);
        localStorage.removeItem('userData');
    }

    return (
        <Contexto.Provider value={{
            users,
            setUsers,
            isLogged,
            setIsLogged,
            loginUser,
            logoutUser,
            posts,
            setPosts,
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