import { FC } from "react";
import { useUserContexto } from "../../context/contexto";
import styled from "styled-components";
import Post from "../../components/Post";

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    height: 100%;
`
const FiltersSection = styled.section`
    
`
const PostsSection = styled.section`
    display: flex;
    justify-content: center;
`

const Inicio: FC = () => {

    const { users } = useUserContexto();

    return (
        <MainContainer>
            <FiltersSection>

            </FiltersSection>

            <PostsSection>
                <Post />
            </PostsSection>
        </MainContainer>
    )
}

export default Inicio;