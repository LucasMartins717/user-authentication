import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 5em;
    border: 1px solid black;
    border-radius: 0.5em;
    background: linear-gradient(180deg, #f1f1f1, #ffffffe8);
    margin-bottom: 1em;
    padding: 0.3em 0.5em 0.67em;
`
const DivHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5em;

    .iconePerfil{
        padding-top: 0.2em;
    }

    h3{
        width: 100%;
        font-size: 1.5em;
        border-bottom: 2px solid black;
        padding: 0;
    }
    
`
const DivText = styled.div`
    p {
        font-size: 1.2em;
        line-height: 1.5em;
        margin: 0;
        background: linear-gradient(transparent calc(1.5em - 2px), black 2px) repeat-y; 
        background-size: 100% 1.5em;
        background-position: 0 1.4em;
    }
`


const Post: FC<{username: string, description: string}> = ({username, description}) => {
    return (
        <DivContainer>
            <DivHeader>
                <FaUserCircle className="iconePerfil" size={35}/>
                <h3>{username}</h3>
            </DivHeader>

            <DivText>
                <p>{description}</p>
            </DivText>
        </DivContainer>
    )
}

export default Post;