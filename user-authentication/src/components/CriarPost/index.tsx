import { FC, useRef, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import styled from "styled-components";
import { useUserContexto } from "../../context/contexto";

const ButtonCreate = styled.div`
    button{
        display: flex;
        background: none;
        border: none;
        margin-bottom: -0.14em;
    }
`
const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    min-height: 3em;
    background-color: #f1f1f1;
    border: 1px solid black;
    border-radius: 0.4em;
    padding-bottom: 0.4em;
    gap: 0.4em;
    z-index: 999;

    h2{
        color: black
    }

    hr{
        background-color: black;
        border: 1px solid black;
        width: 100%;
    }

    textarea{
        width: 80%;
        border-radius: 0.5em;
        height: 1005;
    }

    button{
        padding: 0.4em 2em;
        border: 1px solid black;
        border-radius: 0.4em;
        background-color: aliceblue;
    }

    h3{
        color: #fd6f6f;
    }
    
`
const BackgroundColor = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000a2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 998;
`

const CriarPost: FC = () => {

    const { users } = useUserContexto();
    const [painelAtivo, setPainelAtivo] = useState<boolean>(false);
    const [textDescription, setTextDescription] = useState<string>('');
    const [errorDescription, setErrorDescription] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const responsiveTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    const publicarPost = async () => {

        setErrorDescription('');

        if (!textDescription) {
            setErrorDescription('Escreva algo para publicar o post!')
            return;
        } else {
            setErrorDescription('');
        }

        const textCaracters = textDescription.split("");
        if (textCaracters.length > 1000) {
            setErrorDescription('O post não pode passar de 1000 letras!')
            return;
        } else {
            setErrorDescription('')
        }

        try {
            const response = await fetch('http://localhost:3030/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: users?.id, description: textDescription }),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar o post!');
            }

            const data = await response.json();
            console.log('Post criado com sucesso!' + data);
            setTextDescription('');
            setPainelAtivo(false);
            window.location.reload();
        } catch (err) {
            console.log('Não foi possivel criar o post: ' + err);
        }
    }

    return (
        <>
            <ButtonCreate>
                <button onClick={() => setPainelAtivo(true)}><GoPlusCircle color="white" size={39} /></button>
            </ButtonCreate>
            {painelAtivo &&
                <>
                    <BackgroundColor onClick={() => {setPainelAtivo(false); setErrorDescription('');}} />
                    <DivContainer>
                        <h2>Write the post...</h2>
                        <hr />
                        <h3>{errorDescription}</h3>
                        <textarea ref={textareaRef} value={textDescription} onChange={(e) => { responsiveTextarea(); setTextDescription(e.target.value) }}></textarea>
                        <button onClick={() => publicarPost()}>create</button>
                    </DivContainer>
                </>
            }
        </>
    )
}

export default CriarPost;