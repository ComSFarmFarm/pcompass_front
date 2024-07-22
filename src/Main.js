import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Styled components for the Main Page

const Page = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const Header = styled.h1`
    font-size: 36px;
    font-weight: 700;
    color: #262626;
    text-align: center;
    margin-bottom: 20px;
`;

const Content = styled.div`
    font-size: 18px;
    color: #333;
    text-align: center;
    max-width: 600px;
    margin-bottom: 40px;
`;

const LogoutButton = styled.button`
    width: 200px;
    height: 50px;
    border: none;
    font-weight: 700;
    font-size: 16px;
    background-color: #8528d4;
    border-radius: 24px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    display: block;
    margin: 0 auto;

    &:hover {
        background-color: #5d1a90;
    }
`;

// React component for the Main Page

export default function Main() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Here you can include logic to clear user data or tokens
        navigate('/'); // Redirect to the sign-in page (assuming '/' is the sign-in route)
    };

    return (
        <Page>
            <Header>Welcome to the Main Page!</Header>
            <Content>
                <p>
                    You have successfully logged in. This is the main page where you can find
                    various features and content relevant to your account.
                </p>
                <p>
                    Feel free to explore and enjoy our services.
                </p>
            </Content>
            <LogoutButton onClick={handleLogout}>
                Logout
            </LogoutButton>
        </Page>
    );
}
