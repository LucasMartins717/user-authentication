import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: green;
    width: 20em;
    min-height: 5em;
    padding: 0.3em 0.5em;
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
    
`

const Post: FC = () => {
    return (
        <DivContainer>
            <DivHeader>
                <FaUserCircle className="iconePerfil" size={35}/>
                <h3>Juanilson</h3>
            </DivHeader>

            <DivText>

            </DivText>
        </DivContainer>
    )
}

export default Post;