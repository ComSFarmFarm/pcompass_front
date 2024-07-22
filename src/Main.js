import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RainbowSVG } from './img/rainbow.svg'; // Correct path

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
    padding-bottom: 710px; /* Adjust this value as needed */
`;

const Header = styled.h1`
    font-size: 36px;
    font-weight: 700;
    color: #262626;
    text-align: center;
    margin-top: 20px; /* Adjust margin-top as needed */
    margin-bottom: 10px;
`;

const Content = styled.div`
    font-size: 18px;
    color: #333;
    text-align: center;
    max-width: 600px;
    margin-bottom: 40px;
    margin-top: 10px;
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

const StyledRainbowSVG = styled(RainbowSVG)`
    margin-top: 300px; /* Adjust this value to move the SVG down */
`;

// Main component
const Main = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout functionality
        navigate('/signin'); // Redirect to login page or wherever necessary
    };

    return (
        <Page>
            <StyledRainbowSVG width={148} height={107} />
            <Header>Welcome to the Main Page</Header>
            <Content>
                This is the content area. You can add more information or components here.
            </Content>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Page>
    );
};

export default Main;
