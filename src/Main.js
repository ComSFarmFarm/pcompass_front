import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoSVG } from './img/logo.svg'; // Adjust path to your logo SVG
import { ReactComponent as RainbowSVG } from './img/rainbow.svg';

// Styled components

const Page = styled.div`
    background-color: #1E1E1E;
    min-height: 100vh; /* Ensure the page takes up at least the full viewport height */
    margin: 0; /* Remove default margin */
    color: white; /* Default text color to white for better contrast */
    padding-top: 70px; /* Add padding-top to avoid content overlapping with the Toolbar */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    text-align: center; /* Center text within container */
    position: relative; /* To position the ButtonContainer absolutely at the bottom */
`;

const Toolbar = styled.div`
    width: 100%;
    height: 70px;
    background-color: #1E1E1E;
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

const InfoText = styled.div`
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 200px; /* Space from the top */
`;

const TestText = styled.div`
    color: white;
    font-size: 30px;
    font-weight: bold;
    margin-top: 10px; /* Space from the top */
`;

const CommandText = styled.div`
    color: #F1D1FD;
    font-size: 25px;
    font-weight: bold;
    margin-top: 60px; /* Space from the top */
`;

const StyledRainbowSVG = styled(RainbowSVG)`
    width: 200px; /* Adjust width as needed */
    height: auto;
    margin-top: 30px; /* Space from the CommandText */
`;

const StyledButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 25px 0; /* Increased padding for more height */
    width: calc(100% - 40px); /* Full width with padding considered */
    max-width: 100%; /* No maximum width */
    font-size: 20px; /* Larger font size for better visibility */
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center; /* Center text inside the button */
    box-sizing: border-box; /* Ensure padding is included in width */
    margin: 0px; /* Add margin for spacing */
    margin-top: 280px;

    &:hover {
        background-color: #8528d4;
    }
    &:hover div {
        color: white;
    }
`;

const ButtonText = styled.div`
    font-size: 18px; /* Larger font size to match button height */
    margin-top: 10px;
    color: #6e1aab;
    transition: color 0.3s;
`;


const Main = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/signin');
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
                    <TextLink onClick={handleLogout}>Logout</TextLink>
                    <TextLink onClick={handleSignUp}>Sign Up</TextLink>
                </TextContainer>
                <Divider />
            </Toolbar>

            <InfoText>
                폴스널 컬러테스트
            </InfoText>
            <TestText>
                Politics-Persnal Color Test
            </TestText>
            <CommandText>
                당신의 정치 성향을 테스트해보세요!
            </CommandText>
            <StyledRainbowSVG />

            <StyledButton>
                시작하기
                <ButtonText>
                    현재 38429834명이 참여했어요.
                </ButtonText>
            </StyledButton>
        </Page>
    );
};

export default Main;
