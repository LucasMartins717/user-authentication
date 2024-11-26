import { FC, useRef, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import styled from "styled-components";

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
    
`
const BackgroundColor = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #000000a2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const CriarPost: FC = () => {

    const [painelAtivo, setPainelAtivo] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const responsiveTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    return (
        <>
            <ButtonCreate>
                <button onClick={() => setPainelAtivo(true)}><GoPlusCircle color="white" size={39} /></button>
            </ButtonCreate>
            {painelAtivo &&
                <>
                    <BackgroundColor onClick={() => setPainelAtivo(false)}/>
                    <DivContainer>
                        <h2>Write the post...</h2>
                        <hr />
                        <textarea ref={textareaRef} onChange={() => responsiveTextarea()}></textarea>
                        <button>create</button>
                    </DivContainer>
                </>
            }
        </>
    )
}

export default CriarPost;