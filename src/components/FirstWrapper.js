// PageWrapper.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo'; // Adjust path to your Logo component

const Page = styled.div`
    background-color: #F7F7F7;
    min-height: 100vh;
    margin: 0;
    color: white;
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
`;

const Toolbar = styled.div`
    width: 100%;
    height: 70px;
    background-color: #F7F7F7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
`;

const Divider = styled.div`
    width: 100%;
    height: 3px;
    background-color: #EDEDED;
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
    gap: 30px;
    margin-right: 50px;
`;

const TextLink = styled.span`
    color: black;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: #8528d4;
    }
`;

const FirstWrapper = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <Page>
            <Toolbar>
                <ToolbarText>
                    <Logo />
                </ToolbarText>
                <TextContainer>
                    <TextLink onClick={handleLogout}>Login</TextLink>
                    <TextLink onClick={handleSignUp}>Sign Up</TextLink>
                </TextContainer>
                <Divider />
            </Toolbar>
            {children}
        </Page>
    );
};

export default FirstWrapper;
