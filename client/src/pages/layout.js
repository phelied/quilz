import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import FontStyles from "../utils/fontStyles";


const Layout = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <AppContainer>
            <FontStyles />
            <Header>
                <NavLink>
                    <h1>Quilz</h1>
                    <ul>
                        <li>
                            <Link to="/">Quizzes</Link>
                        </li>
                        {isAuthenticated ? (
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/signin">SignIn</Link>
                                </li>
                                <li>
                                    <Link to="/signup">SignUp</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </NavLink>
            </Header>
            <Outlet />
        </ AppContainer>
    )
};


const Header = styled.header`
    background-color: #7380ff;
    height: 50px;
    color: #fff;
`;
const AppContainer = styled.div`
`;

const NavLink = styled.nav`
font-family: "Neue Haas Grotesk Display - Roman";
font-weight: 800;
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
padding: 0 0.5rem;

& h1 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
    font-family: "Caraque-Melt";
}

& ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
}

& li:last-child {
    border: 1px solid #fff;
    border-radius: 0.75rem;
    padding: 0.25rem 0.5rem;
}

& li > a {
    margin: 0 10px;
    text-decoration: none;
    color: white;
}


`;

export default Layout;