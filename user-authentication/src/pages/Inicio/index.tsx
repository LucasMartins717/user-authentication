import { FC } from "react";
import Cabecalho from "../../components/Cabecalho";
import { useUserContexto } from "../../context/contexto";

const Inicio: FC = () => {

    const { users } = useUserContexto();

    return (
        <>
            <Cabecalho />

            {users.map((user) => (
                <>
                    <h1>{user.id}</h1>
                    <h1>{user.username}</h1>
                </>
            ))}
        </>
    )
}

export default Inicio;