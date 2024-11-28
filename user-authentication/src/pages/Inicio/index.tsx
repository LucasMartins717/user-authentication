import { FC } from "react";
import { useUserContexto } from "../../context/contexto";
import styled from "styled-components";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import CriarPost from "../../components/CriarPost";

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    padding: 1.4em 1.5em;
    height: 100%;
`
const LoginSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.4em;

    .userLink{
        width: 100%;
        padding: 0.4em;
        background: linear-gradient( 143deg, #404040, #262926);
        border: 1px solid black;
        border-radius: 0.4em;
        text-decoration: none;
        text-align: center;
        font-size: 1.5em;
        color: white;
    }
`
const UsersSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: end;
    border-bottom: 2px solid #f1f1f1;
    padding-bottom: 0.2em;
    color: white;

    h2{
        font-size: 2em;
        margin-bottom: -0.2em;
    }
`
const PostsSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.5em;
    margin-bottom: 1em;
`
const DisconnectButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #303030;
    padding: 0.8em;
    
    button{
        padding: 0.3em 1em;
        background-color: #4b4b4b;
        border: 1px solid black;
        border-radius: 0.3em;
        color: white;
        cursor: pointer;
    }
`

const Inicio: FC = () => {

    const { isLogged, posts, users, logoutUser } = useUserContexto();

    return (
        <MainContainer>

            {!isLogged && <LoginSection>
                <Link to={'/register'} className="userLink">Sign Up</Link>
                <Link to={'/login'} className="userLink">Login</Link>
            </LoginSection>}

            {isLogged && <UsersSection>
                <FaUserCircle color="white" size={39} />
                <h2>{users?.username}</h2>
                <CriarPost />
            </UsersSection>}

            <PostsSection>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        username={post.username}
                        description={post.description}
                        user_id={post.user_id}
                        post_id={post.id}
                    />
                ))}
            </PostsSection>

            <DisconnectButton>
                <button onClick={() => logoutUser()}>disconnect</button>
            </DisconnectButton>
        </MainContainer>
    )
}

export default Inicio;