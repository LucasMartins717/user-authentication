import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const SectionAviso = styled.section`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5em 1em 0.5em 1em;
    border: 1px solid black;
    border-radius: 0.4em;
    background-color: #74463e;
    text-align: center;

    h3{
        color: #c5675a;
        border-bottom: 1px solid red;
    }
`
const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #1d1d1d52;
`

const AvisoLogin: FC<{ titulo: string }> = ({ titulo }) => {

    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [])

    return (
        visible &&
        <>
            <Background />
            <SectionAviso>
                <h3>{titulo}</h3>
            </SectionAviso>
        </>
    )
}

export default AvisoLogin;