import { FC, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
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
    height: 30em;
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
        top: -3px;
        font-size: clamp(1.2em, 1.2em + 1.2vw, 3em);
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

const Registro: FC = () => {

    const [inputUsername, setInputUsername] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

    const formValidation = async () => {

        let temErro: boolean = false;

        if (!inputUsername) {
            setUsernameError('Por favor, preencha o nome de usuário!');
            temErro = true;
        } else {
            setUsernameError('');


            try {
                const response = await fetch('http://localhost:3030/check-username', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: inputUsername }),
                });

                const checkData = await response.json();

                if (!response.ok) {
                    setUsernameError(checkData.message);
                    temErro = true;
                } else {
                    setUsernameError('');
                }

            } catch (err) {
                console.log('Erro ao verificar nome de usuario: ' + err);
                temErro = true;
                setUsernameError('Erro ao verificar nome de usuario');
            }

        }

        if (!inputPassword) {
            setPasswordError('Digite uma senha!');
            temErro = true;
        } else {
            setPasswordError('');
        }

        if (inputPassword !== inputConfirmPassword) {
            setConfirmPasswordError('As senhas não conferem!');
            temErro = true;
        } else {
            setConfirmPasswordError('');
        }

        if (inputPassword.length < 8) {
            setPasswordError('A senha tem que ter mais de 8 caracteres!');
            temErro = true;
        } else {
            setPasswordError('');
        }

        if (!temErro) {
            await registerUser();
        }
    }

    const registerUser = async () => {

        try {
            const response = await fetch('http://localhost:3030/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputUsername,
                    password: inputPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
            }

        } catch (err) {
            console.log('Erro ao criar o usuario: ' + err);
        }
    }

    return (
        <MainContainer>

            <DivGoBack>
                <button> <Link to={'/'} className="goBackButton"><RiArrowGoBackFill size={50} /></Link> </button>
            </DivGoBack>

            <SectionRegister>
                <DivTitulo>
                    <div className="titleLeftBorder"></div>
                    <h1>Register</h1>
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

                    <div className="inputForm">
                        <input type="password" value={inputConfirmPassword} onChange={(e) => setInputConfirmPassword(e.target.value)} placeholder="" />
                        <label>Confirm Password</label>
                        {confirmPasswordError && <h5>{confirmPasswordError}</h5>}
                    </div>

                </DivFormulario>
                <DivButton>
                    <button onClick={() => formValidation()}>Confirm</button>
                </DivButton>
            </SectionRegister>
        </MainContainer>
    )
}

export default Registro;