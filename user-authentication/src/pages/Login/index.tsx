import { FC, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    padding: 1.4em 1.5em;
`
const DivGoBack = styled.div`
    position: absolute;
    top: 0;
    padding: 1.4em 1.5em;

    button{
        width: 100%;
        padding: 0.4em 0.4em 0.2em;
        background: linear-gradient( 143deg, #404040, #262926);
        border: 1px solid black;
        border-radius: 0.4em;
        text-decoration: none;
        text-align: center;
        color: white;
    };

    .goBackButton{
        text-decoration: none;
        color: white;
    }
`
const SectionRegister = styled.section`
    position: relative;
    width: 100%;
    height: 25em;
    background-color: #2E2E2E;
    border-radius: 0.5em;
    border: 1px solid #00000081;
    padding: 3em 10% 0.5em 10%;
`
const DivTitulo = styled.div`
    h1{
        font-size: 3em;
        user-select: none;
        color: #cf624f;
    }

    .titleLeftBorder{
        position: absolute;
        left: 0;
        width: 0.4em;
        height: 3.6em;
        background-color: #C0392B;
    }
`
const DivFormulario = styled.div`
    position: relative;
    margin-top: 2.7em;

    .inputForm{
        position: relative;
        margin-bottom: 1.2em;

        h5{
            position: absolute;
            top: 2em;
            color: red;
            font-size: 0.9em;
        }
    }

    input{
        width: 100%;
        margin-bottom: 1.2em;
        border: none;
        border-bottom: 0.1em solid #C0392B;
        background: none;
        font-size: clamp(1.1em, 1.1em + 1vw, 3em);
        outline: none;
        color: #cf624f;

        &:focus + label,
        &:not(:placeholder-shown) + label {
            top: -20px;
            left: 0;
            font-size: 1em;
            color: #C0392B;
        }
    }

    label{
        position: absolute;
        left: 0;
        top: -10px;
        font-size: 1.6em;
        font-weight: 500;
        transition: all 0.2s ease-in;
        pointer-events: none;
        user-select: none;
        color: #cf624f;
    }
`
const DivButton = styled.div`
    
    button{
        width: 100%;
        height: 2.4em;
        font-size: 1.7em;
        border: 1px solid black;
        border-radius: 0.3em;
        user-select: none;
        background-color: #303030;
        color: #C0392B;
        cursor: pointer;
    }
`

const Login: FC = () => {

    const [inputUsername, setInputUsername] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const navigate = useNavigate();

    const loginValidation = async () => {

        let temErro: boolean = false;

        if (!inputUsername) {
            setUsernameError('Por favor, preencha o nome de usuário!');
            temErro = true;
        } else {
            setUsernameError('');
        }

        if (!inputPassword) {
            setPasswordError('Digite uma senha!');
            temErro = true;
        } else {
            setPasswordError('');
        }

        if (!temErro) {
            try {
                const response = await fetch('http://localhost:3030/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: inputUsername, password: inputPassword }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    navigate('/')
                } else {
                    setPasswordError(data.message);
                    temErro = true;
                }
            } catch (err) {
                console.error('Login failed: ' + err);
                setPasswordError('Server connection error!');
            }
        }
    }

    return (
        <MainContainer>

            <DivGoBack>
            <button><Link to={'/'} className="goBackButton"><RiArrowGoBackFill size={50} /></Link> </button>
            </DivGoBack>

            <SectionRegister>
                <DivTitulo>
                    <div className="titleLeftBorder"></div>
                    <h1>Login</h1>
                </DivTitulo>
                <DivFormulario>

                    <div className="inputForm">
                        <input type="text" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} placeholder="" />
                        <label>Username</label>
                        {usernameError && <h5>{usernameError}</h5>}
                    </div>

                    <div className="inputForm">
                        <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} placeholder="" />
                        <label>Password</label>
                        {passwordError && <h5>{passwordError}</h5>}
                    </div>

                </DivFormulario>
                <DivButton>
                    <button onClick={() => loginValidation()}>Confirm</button>
                </DivButton>
            </SectionRegister>
        </MainContainer>
    )
}

export default Login;