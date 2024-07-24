import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoSVG } from './img/logo.svg';
import { ReactComponent as RainbowSVG } from './img/rainbow.svg';

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

const InfoText = styled.div`
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    margin-top: 100px; /* Space from the top */
    margin-bottom: 0px;
`;

const StyledRainbowSVG = styled(RainbowSVG)`
    width: 130px; /* Adjust width as needed */
    height: auto;
    margin-top: 50px; /* Space from the CommandText */
`;

const TestText = styled.div`
    color: #8459FF;
    font-size: 24px;
    font-weight: bold;
    margin-top: 50px; /* Space from the top */
`;

const AdditionalText = styled.div`
    color: #fff;
    font-size: 20px;
    margin-top: 40px; /* Space from the top */
    line-height: 1.5; /* Adjust line height for better readability */
    margin-bottom: 50px;
`;

const NextButton = styled.button`
    background-color: #8459FF;
    color: white;
    font-size: 24px;
    font-weight: bold;
    padding: 20px 200px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 0px; /* Space from the bottom */
    transition: background-color 0.3s;
    margin-top: 120px;

    &:hover {
        background-color: #673ab7;
    }

    &:active {
        background-color: #512da8;
    }
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
            <InfoText>
                폴스널 컬러테스트란?
            </InfoText>
            <StyledRainbowSVG />
            <TestText>
                MBTI와 같은 방식으로 나만의 정치색을 만들어 봐요!
            </TestText>
            <AdditionalText>
                0000 기간 동안 000명의 여론조사를 거쳐<br />
                한국인의 정치성향 분류 모델을 만들었습니다.<br /><br />
                대표적인 7개의 당 색을 조합한 나만의 정치색,<br />
                즉 Politics-personal color 를 볼 수 있습니다.<br /><br />
                '나의 정치색'을 확인해보세요!
            </AdditionalText>
            <NextButton onClick={handleStartTest}>다음</NextButton>
        </Page>
    );
};

export default Main;
