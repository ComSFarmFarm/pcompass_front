import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper'; // Correct path to PageWrapper
import { ReactComponent as PyramidSVG } from '../img/pyramid.svg';

const InfoText = styled.div`
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 100px; /* Space from the top */
`;

const CommandText = styled.div`
    color: #A956FC;
    font-size: 50px;
    font-weight: bold;
    margin-top: 100px; /* Space from the top */
    text-align: center; /* Center align text */
`;

const PyramidContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center; /* Center align the SVG */
    margin-bottom: 105px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; /* Space between buttons */
    margin-top: 20px;
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
    margin-top: 40px; /* Adjusted to ensure spacing from the previous elements */

    &:hover {
        background-color: #8528d4;
    }
`;

const SmallButton = styled.button`
    background-color: dark-gray;
    color: black;
    border: none;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 30px;
    padding: 10px 20px; /* Padding for height */
    width: auto;
    font-size: 20px; /* Larger font size for better visibility */
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center; /* Center text inside the button */
    box-sizing: border-box; /* Ensure padding is included in width */
    &:hover {
        background-color: #8528d4;
        color: white;
    }
`;

const ButtonText = styled.div`
    font-size: 18px; /* Larger font size to match button height */
    margin-top: 10px;
    color: #6e1aab;
    transition: color 0.3s;
`;

const RecommendationText = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    margin-top: 120px; /* Space from the top */
    margin-bottom:320px;
    text-align: center;
`;

const Quiz = () => {
    const [showRecommendation, setShowRecommendation] = useState(false);
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate('/test');
    };

    const handleScoreManagement = () => {
        setShowRecommendation(false);
    };

    const handleCustomRecommendations = () => {
        setShowRecommendation(true);
    };

    return (
        <PageWrapper>
            <InfoText>
                당신의 정치점수
            </InfoText>
            <ButtonContainer>
                <SmallButton onClick={handleScoreManagement}>
                    점수 관리
                </SmallButton>
                <SmallButton onClick={handleCustomRecommendations}>
                    포인트 관리
                </SmallButton>
            </ButtonContainer>
            {!showRecommendation && (
                <>
                    <CommandText>
                        2등급
                    </CommandText>
                    <PyramidContainer>
                        <PyramidSVG width={300} height={300} />
                    </PyramidContainer>
                </>
            )}
            {showRecommendation && (
                <RecommendationText>
                    1등급: ~~
                    <br />
                    2등급: ~~
                    <br />
                    3등급: ~~
                    <br />
                    4등급: ~~
                </RecommendationText>
            )}
            <StyledButton onClick={handleStartTest}>
                퀴즈 풀기
                <ButtonText>
                    난이도 : 상
                </ButtonText>
            </StyledButton>
        </PageWrapper>
    );
};

export default Quiz;
