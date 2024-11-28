import { FC } from "react";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { useUserContexto } from "../../context/contexto";

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
    position: relative;
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

    .deleteIcon{
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
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


const Post: FC<{ username: string, description: string, user_id: number, post_id: number }> = ({ username, description, user_id, post_id }) => {

    const { users } = useUserContexto();

    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:3030/posts`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: post_id })
            });

            if (!response) {
                throw new Error('Erro ao deletar post!');
            }

            if(response.status === 204){
                console.log('POST DELETADO COM SUCESSO!');
            }else{
                const data = await response.json();
                console.log('ERRO AO DELETAR POST: ' + data);
            }

        } catch (err) {
            console.log('DEU ERRO AO DELETAR: ' + err);
        }
    }


    return (
        <DivContainer>
            <DivHeader>
                <FaUserCircle className="iconePerfil" size={35} />
                <h3>{username}</h3>
                {users?.id == user_id ? <FaTrashAlt size={25} onClick={() => {deletePost(); window.location.reload()}} className="deleteIcon" /> : ''}
            </DivHeader>

            <DivText>
                <p>{description}</p>
            </DivText>
        </DivContainer>
    )
}

export default Post;