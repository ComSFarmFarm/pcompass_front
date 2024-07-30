import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoSVG } from './img/logo.svg';

const Page = styled.div`
    background-color: #18181D;
    min-height: 100vh; /* Ensure the page takes up at least the full viewport height */
    margin: 0; /* Remove default margin */
    color: white; /* Default text color to white for better contrast */
    padding-top: 70px; /* Add padding-top to avoid content overlapping with the Toolbar */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    text-align: center; /* Center text within container */
    position: relative; /* To position the ButtonContainer absolutely at the bottom */
`;

const Toolbar = styled.div`
    width: 100%;
    height: 70px;
    background-color: #18181D;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    margin-bottom: 0px;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #666;
    position: absolute;
    bottom: 0;
    left: 0;
`;

const ToolbarText = styled.span`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 50px;
`;

const TextLink = styled.span`
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: #8528d4;
    }
`;

const Logo = styled(LogoSVG)`
    width: 200px;
    height: auto;
    margin-top: 45px;
    margin-left: 50px;
`;

const Main = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/signin');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleStartTest = () => {
        navigate('/test');
    };

    return (
        <Page>
            <Toolbar>
                <ToolbarText>
                    <Logo />
                </ToolbarText>
                <TextContainer>
                    <TextLink onClick={handleLogout}>Logout</TextLink>
                    <TextLink onClick={handleSignUp}>Sign Up</TextLink>
                </TextContainer>
                <Divider />
            </Toolbar>
        </Page>
    );
};

export default Main;