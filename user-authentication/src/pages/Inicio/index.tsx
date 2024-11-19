import { FC } from "react";
import { useUserContexto } from "../../context/contexto";

const Inicio: FC = () => {

    const { users } = useUserContexto();

    return (
        <>
            <h1>asdf</h1>

            {users.map((user) => (
            <div>
                <h1>{user.id}</h1>
                <h1>{user.username}</h1>
            </div>    
            ))}
        </>
    )
}

export default Inicio;