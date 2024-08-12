import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper'; // PageWrapper의 올바른 경로
import Leaderboard from '../components/Leaderboard'; // Leaderboard 컴포넌트 임포트

const InfoText = styled.div`
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 100px; /* 상단 여백 */
`;

const CommandText = styled.div`
    color: #A956FC;
    font-size: 50px;
    font-weight: bold;
    margin-top: 100px; /* 상단 여백 */
    text-align: center; /* 텍스트 중앙 정렬 */
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; /* 버튼 사이 간격 */
    margin-top: 20px;
`;

const StyledButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 25px 0; /* 높이를 위한 패딩 증가 */
    width: calc(100% - 40px); /* 패딩을 고려한 전체 너비 */
    max-width: 100%; /* 최대 너비 없음 */
    font-size: 20px; /* 가시성을 위한 글꼴 크기 증가 */
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center; /* 버튼 내부 텍스트 중앙 정렬 */
    box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
    margin: 0px; /* 간격을 위한 여백 추가 */
    margin-top: 213px; /* 이전 요소와의 간격 조정 */

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
    padding: 10px 20px; /* 높이를 위한 패딩 */
    width: auto;
    font-size: 20px; /* 가시성을 위한 글꼴 크기 증가 */
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center; /* 버튼 내부 텍스트 중앙 정렬 */
    box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
    &:hover {
        background-color: #8528d4;
        color: white;
    }
`;

const ButtonText = styled.div`
    font-size: 18px; /* 버튼 높이에 맞춘 글꼴 크기 증가 */
    margin-top: 10px;
    color: #6e1aab;
    transition: color 0.3s;
`;


const GaugeWrapper = styled.div`
    margin: 50px auto;
    width: 300px;
    height: 150px;
    position: relative;
`;

const GaugeBackground = styled.div`
    width: 100%;
    height: 100%;
    background: #333;
    border-radius: 150px 150px 0 0;
    overflow: hidden;
    position: relative;
`;

const GaugeFill = styled.svg`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: clip-path 0.7s ease-out;
`;

const Needle = styled.div`
    width: 6px;
    height: 120%;
    background: white;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform-origin: bottom center;
    transform: rotate(${props => props.angle}deg);
    transition: transform 0.1s ease-out;
`;

const ScoreText = styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const Quiz = () => {
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false); // 추가된 상태
    const [score, setScore] = useState(0); // 초기 점수를 0으로 설정
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate('/test');
    };

    const handleScoreManagement = () => {
        setShowRecommendation(false);
        setShowLeaderboard(false); // 점수 관리 클릭 시 순위 표도 숨기기
    };

    const handleViewLeaderboard = () => {
        setShowLeaderboard(true); // 순위 보기 버튼 클릭 시 순위 표 표시
        setShowRecommendation(false); // 추천 항목 숨기기
    };

    const current = 335;

    useEffect(() => {
        // 점수 증가 시뮬레이션
        const interval = setInterval(() => {
            setScore(prev => (prev < current ? prev + 10 : current)); // 200점까지 증가
        }, 70);

        return () => clearInterval(interval);
    }, []);

    const limitedAngle = (score / current) * ((current / 1000) * 180); // 점수를 각도로 변환 (0에서 36도)

    const createClipPath = () => {
        const radius = 150;
        const centerX = 150;
        const centerY = 150;
        const startAngle = -90; // 시작 각도 (0도)
        const endAngle = limitedAngle - 90; // 바늘의 각도에 따른 끝 각도
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0; // 180도 이상의 큰 호 여부
        const startX = centerX + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
        const startY = centerY + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
        const endX = centerX + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
        const endY = centerY + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

        return `M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
    };

    // 더미 데이터 (실제 데이터는 API 등에서 받아올 수 있습니다.)
    const leaderboardData = [
        { name: '홍길동', score: 950 },
        { name: '이순신', score: 870 },
        { name: '김유신', score: 800 },
        { name: '강감찬', score: 730 },
        // 더 많은 데이터 추가 가능
    ];

    return (
        <PageWrapper>
            <InfoText>
                당신의 정치점수
            </InfoText>
            <ButtonContainer>
                <SmallButton onClick={handleScoreManagement}>
                    점수 관리
                </SmallButton>
                <SmallButton onClick={handleViewLeaderboard}>
                    순위 보기
                </SmallButton>
            </ButtonContainer>
            {!showRecommendation && !showLeaderboard && (
                <>
                    <CommandText>
                        {current}점
                    </CommandText>
                    <GaugeWrapper>
                        <GaugeBackground>
                            <GaugeFill viewBox="0 0 300 150">
                                <defs>
                                    <clipPath id="clip">
                                        <path d={createClipPath()} />
                                    </clipPath>
                                    <linearGradient id="gradient">
                                        <stop offset="0%" stopColor="#ff0000" />
                                        <stop offset="50%" stopColor="#ffff00" />
                                        <stop offset="100%" stopColor="#00ff00" />
                                    </linearGradient>
                                </defs>
                                <rect x="0" y="0" width="300" height="150" fill="url(#gradient)" clipPath="url(#clip)" />
                            </GaugeFill>
                            <Needle angle={limitedAngle - 90} />
                        </GaugeBackground>
                        <ScoreText>{score} / 1000</ScoreText>
                    </GaugeWrapper>
                </>
            )}
            {showLeaderboard && (
                <Leaderboard data={leaderboardData} />
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
