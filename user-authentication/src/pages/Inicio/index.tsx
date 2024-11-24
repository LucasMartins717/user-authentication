import { FC } from "react";
import { useUserContexto } from "../../context/contexto";
import styled from "styled-components";
import Post from "../../components/Post";

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    padding: 1em 2em;
    height: 100%;
`
const FiltersSection = styled.section`
    display: flex;
    gap: 2em;

    .filterItem{
        display: flex;
        gap: 0.5em;
    }
`
const PostsSection = styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 3.4%;
    margin-top: 3em;
`

const Inicio: FC = () => {

    const { users } = useUserContexto();

    return (
        <MainContainer>
            <FiltersSection>

                <div className="filterItem">
                    <label htmlFor="date">Data</label>
                    <select name="date" id="date">
                        <option value="nova-pra-antiga">Nova pra antiga</option>
                        <option value="antiga-pra-nova">Antiga pra nova</option>
                    </select>
                </div>

                <div className="filterItem">
                    <label htmlFor="alphabetic">Alfabetica</label>
                    <select name="alphabetic" id="alphabetic">
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </div>

            </FiltersSection>

            <PostsSection>

                <Post />

            </PostsSection>
        </MainContainer>
    )
}

export default Inicio;