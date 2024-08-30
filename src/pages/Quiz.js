import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Leaderboard from '../components/Leaderboard';
import { fetchQuizResult, fetchColorResult } from '../api';

const InfoText = styled.div`
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 100px;
`;

const CommandText = styled.div`
    color: #A956FC;
    font-size: 50px;
    font-weight: bold;
    margin-top: 100px;
    text-align: center;
`;

const PercentBox = styled.div`
    background: #f4f4f4;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%; /* 컨테이너의 너비를 80%로 설정 */
    max-width: 1200px; /* 최대 너비를 1200px로 설정 (옵션) */
`;

const PercentText = styled.div`
    color: black;
    font-size: 25px;
    font-weight: bold;
    margin: 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
`;

const StyledButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 25px 0;
    width: calc(100% - 40px);
    max-width: 100%;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    box-sizing: border-box;
    margin: 0;
    margin-top: 213px;

    &:hover {
        background-color: #8528d4;
    }
`;

const SmallButton = styled.button`
    background-color: darkgray;
    color: black;
    border: none;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 30px;
    padding: 10px 20px;
    width: auto;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    
    &:hover {
        background-color: #8528d4;
        color: white;
    }
`;

const ButtonText = styled.div`
    font-size: 18px;
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
    color: black;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const ScoreText2= styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    padding: 30px;
    background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
    border-radius: 20px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    color: #333;
    border: 1px solid #ccc;
    width: 80%; /* 컨테이너의 너비를 80%로 설정 */
    max-width: 1200px; /* 최대 너비를 1200px로 설정 (옵션) */
`;

const ResultText = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 15px;
`;

const GaugeSection = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
`;

const Quiz = () => {
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [score, setScore] = useState(0);
    const [current, setCurrent] = useState(335); // 초기 current 값은 335로 설정
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [colorScore, setColorScore] = useState(0); // colorScore를 위한 상태 추가
    const [colorCurrent, setColorCurrent] = useState(335); // colorCurrent 값을 위한 상태 추가
    const [percent, setPercent] = useState(0); // 상위 퍼센트를 위한 상태 추가
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate('/polquiz');
    };

    const handleScoreManagement = () => {
        setShowRecommendation(false);
        setShowLeaderboard(false);
    };

    const handleViewLeaderboard = () => {
        setShowLeaderboard(true);
        setShowRecommendation(false);
    };

    useEffect(() => {
        // 퀴즈 결과를 가져와 current 값을 업데이트
        const fetchData = async () => {
            try {
                const result = await fetchQuizResult();
                const myScore = result?.my_rank?.[0]?.quiz_score || 335; // 내 점수를 가져오거나 기본값 335로 설정
                const topPlayers = result.top4.map(player => ({
                    name: player.username,
                    score: parseInt(player.quiz_score, 10),
                }));
                setLeaderboardData(topPlayers);
                setCurrentUser(result.my_rank[0].username);
                setCurrent(myScore);
            } catch (error) {
                console.error("퀴즈 결과를 가져오는 중 오류 발생:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // 점수 증가 시뮬레이션 (퀴즈 결과)
        const interval = setInterval(() => {
            setScore(prev => (prev < current ? prev + 10 : current)); // current 값까지 증가
        }, 70);

        return () => clearInterval(interval);
    }, [current]);

    useEffect(() => {
        // 색상 결과를 가져와 colorCurrent 값을 업데이트
        const fetchColorData = async () => {
            try {
                const colorAverage = await fetchColorResult(); // fetchColorResult 호출
                setColorCurrent(colorAverage || 335); // colorCurrent 업데이트 (기본값 335)
            } catch (error) {
                console.error("색상 결과를 가져오는 중 오류 발생:", error);
            }
        };

        fetchColorData();
    }, []);

    useEffect(() => {
        // 점수 증가 시뮬레이션 (색상 결과)
        const interval = setInterval(() => {
            setColorScore(prev => (prev < colorCurrent ? prev + 10 : colorCurrent)); // colorCurrent 값까지 증가
        }, 70);

        return () => clearInterval(interval);
    }, [colorCurrent]);

    useEffect(() => {
        // 내 점수가 내 나이대 평균 점수보다 상위 몇 퍼센트인지 계산
        if (colorCurrent > 0) {
            const calculatedPercent = ((current - colorCurrent) / colorCurrent);
            setPercent(calculatedPercent.toFixed(2)); // 소수점 둘째 자리까지 표시
        }
    }, [current, colorCurrent]);

    const limitedAngle = (score / 1000) * 180; // 점수를 각도로 변환 (0에서 180도)
    const colorLimitedAngle = (colorScore / 1000) * 180; // colorScore 점수를 각도로 변환

    const createClipPath = () => {
        const radius = 150;
        const centerX = 150;
        const centerY = 150;
        const startAngle = -90; // 시작 각도
        const endAngle = limitedAngle - 90; // 바늘의 각도에 따른 끝 각도
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        const startX = centerX + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
        const startY = centerY + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
        const endX = centerX + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
        const endY = centerY + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

        return `M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
    };

    const createColorClipPath = () => {
        const radius = 150;
        const centerX = 150;
        const centerY = 150;
        const startAngle = -90; // 시작 각도
        const endAngle = colorLimitedAngle - 90; // 바늘의 각도에 따른 끝 각도
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        const startX = centerX + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
        const startY = centerY + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
        const endX = centerX + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
        const endY = centerY + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

        return `M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
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
                        <ScoreText2>{score} / 1000</ScoreText2>
                    </GaugeWrapper>

                    {/* 새로운 디자인 컨테이너 추가 */}
                    <ResultContainer>
                        <ResultText>내 나이대 평균 점수: {colorCurrent}점</ResultText>
                        <GaugeSection>
                            <GaugeWrapper>
                                <GaugeBackground>
                                    <GaugeFill viewBox="0 0 300 150">
                                        <defs>
                                            <clipPath id="clipColor">
                                                <path d={createColorClipPath()} />
                                            </clipPath>
                                            <linearGradient id="gradientColor">
                                                <stop offset="0%" stopColor="#0000ff" />
                                                <stop offset="50%" stopColor="#87cefa" />
                                                <stop offset="100%" stopColor="#add8e6" />
                                            </linearGradient>
                                        </defs>
                                        <rect x="0" y="0" width="300" height="150" fill="url(#gradientColor)" clipPath="url(#clipColor)" />
                                    </GaugeFill>
                                    <Needle angle={colorLimitedAngle - 90} />
                                </GaugeBackground>
                                <ScoreText>{colorScore} / 1000</ScoreText>
                            </GaugeWrapper>
                        </GaugeSection>
                        <PercentBox>
                            <PercentText>
                                당신은 나이대 평균에 비해 상위 {percent}%에 속합니다.
                            </PercentText>
                        </PercentBox>
                    </ResultContainer>
                </>
            )}
            {showLeaderboard && (
                <Leaderboard data={leaderboardData} currentUser={currentUser} />
            )}
            <StyledButton onClick={handleStartTest}>
                퀴즈 풀기
                <ButtonText>
                    난이도 상
                </ButtonText>
            </StyledButton>
        </PageWrapper>
    );
};

export default Quiz;
