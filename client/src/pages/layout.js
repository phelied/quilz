import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import FontStyles from "../utils/fontStyles";
import { useEffect, useState } from "react";


const Layout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('token') ? true : false);
    }, []);

    const deleteItem = (itemKey) =>{
        localStorage.removeItem(itemKey);
      }

    return (
        <AppContainer>
            <FontStyles />
            <Header>
                <NavLink>
                    <Link to='/'><h1>Quilz</h1></Link>
                    <ul>
                        <li>
                            <Link to="/">Quizzes</Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/signin" onClick={() => deleteItem("token")}>Logout</Link>
                                </li>
                            </>
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
    height: 50px;
    color: #000;
`;
const AppContainer = styled.div`
`;

const NavLink = styled.nav`
font-weight: 800;
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
padding: 0 0.5rem;

& h1 {
    font-size: 3rem;
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

& a {
    text-decoration: none;
    color: black;
}

& li:last-child {
    border: 1px solid #fff;
    border-radius: 0.75rem;
background-color: orange;
    padding: 0.25rem 0.5rem;
}

& li > a {
    margin: 0 10px;
    text-decoration: none;
    color: black;
}


`;

export default Layout;