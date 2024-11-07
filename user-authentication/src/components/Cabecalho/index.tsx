import { FC } from "react";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DivHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 0.4em 10em;
    width: 100%;
    background-color: #a2af89;
`
const DivLogo = styled.div`
    display: flex;
`
const NavItens = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;

    .link{
        color: #585858;
        font-weight: 700;
        font-size: 1.5em;
        text-decoration: none;
    }
`
const UserLogin = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5%;
`

const Cabecalho: FC = () => {
    return (
        <DivHeader>
            <DivLogo>
                <h1>LoginTest</h1>
            </DivLogo>

            <NavItens>
                <Link to={'/framboesa'} className="link">Framboesa</Link>
                <Link to={'/julipoeira'} className="link">Pulipoeira</Link>
                <Link to={'/tikolake'} className="link">Fikotake</Link>
                <Link to={'/manufatura'} className="link">Manufatura</Link>
            </NavItens>

            <UserLogin>
                <h3><FaRegHeart /></h3>
                <Link to={'/login'}><FaRegUserCircle size={40}/></Link>
            </UserLogin>
        </DivHeader>
    )
}

export default Cabecalho;