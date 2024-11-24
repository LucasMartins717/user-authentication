import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
`
const NavLinks = styled.nav`
    display: flex;
    align-items: center;
    gap: 6em;

    .headerTitle{
        font-weight: 700;
        font-size: 3em;
        color: white;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
    }

    ul{
        display: flex;
        justify-content: start;
        list-style: none;
        gap: 20%;
        color: #e4e4e4;
    }

    li{
        display: flex;
        font-size: 1.5em;
        font-weight: 700;
        cursor: pointer;
        user-select: none;
    }
`
const DivButtons = styled.div`
    display: flex;
    gap: 1em;

    button{
        font-size: 1.2em;
        padding: 0.3em 0.8em;
        border-radius: 0.2em;
        border: 1px solid #ffffff16;
        background: linear-gradient(135deg, #181818, #2c2c2c );
        cursor: pointer;
        user-select: none;
        
        .link{
            text-decoration: none;
            color: white;
        }
    }
`

const Cabecalho: FC = () => {
    return (
        <HeaderContainer>

            <NavLinks>
                <Link to={'/'} className="headerTitle">Authentication</Link>

                <ul>
                    <li>Products</li>
                    <li>Developers</li>
                    <li>Company</li>
                    <li>Pricing</li>
                </ul>
            </NavLinks>

            <DivButtons>
                <button><Link to="/login" className="link">Login</Link></button>
                <button><Link to="/register" className="link">Sign Up</Link></button>
            </DivButtons>

        </HeaderContainer>
    )
}

export default Cabecalho;