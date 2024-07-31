// src/pages/Main.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper'; // Correct path to PageWrapper
import { ReactComponent as RainbowSVG } from '../img/rainbow.svg';

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
`;

const ButtonText = styled.div`
    font-size: 18px; /* Larger font size to match button height */
    margin-top: 10px;
    color: #6e1aab;
    transition: color 0.3s;
`;

const First= () => {
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate('/test');
    };

    return (
        <PageWrapper>
            <InfoText>
                폴스널 컬러테스트
            </InfoText>
            <TestText>
                (Politics-Personal Color Test)
            </TestText>
            <CommandText>
                당신의 정치 성향을 테스트해보세요!
            </CommandText>
            <StyledRainbowSVG />
            <StyledButton onClick={handleStartTest}>
                시작하기
                <ButtonText>
                    현재 38429834명이 참여했어요.
                </ButtonText>
            </StyledButton>
        </PageWrapper>
    );
};

export default First;
