import styled from "styled-components";
import Img from "../assets/images/404.webp";

const Error404 = () => {
    return (<Wrapper>
        <img src={Img} alt="404" />
        <h1>Oops! You seem to be lost.</h1>
    </Wrapper>);
};

export default Error404;

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    height: 80vh;

    & img {
        height: 70%;
    }
`;

