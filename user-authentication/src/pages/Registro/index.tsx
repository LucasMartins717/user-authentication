import { FC, useState } from "react";
import styled from "styled-components";

const MainContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%,-50%);
`
const SectionRegister = styled.section`
    position: relative;
    width: 30em;
    height: 30em;
    background-color: #2E2E2E;
    border-radius: 0.5em;
    border: 1px solid #00000081;
    padding: 3em 3em 0.5em 3em;
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
        font-size: 1.4em;
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

const Registro: FC = () => {

    const [inputUsername, setInputUsername] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

    const formValidation = () => {

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
            registerUser();
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