import React from 'react';
import PageWrapper from '../components/PageWrapper'; // Adjust path to your PageWrapper component
import styled from 'styled-components';
import GradientBox from '../components/GradientBox2'; // GradientBox 컴포넌트 임포트

const InfoText = styled.div`
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 0px;
`;

const TestText = styled.div`
    color: white;
    font-size: 26px;
    font-weight: bold;
    margin-top: 80px;
    margin-bottom: -65px;
`;

const AdditionalText = styled.div`
    color: white;
    font-size: 25px;
    font-weight: bold;
    line-height: 1.5;
    margin-top: 30px;
    margin-bottom: 10px;
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
    margin-bottom: 100px;
    transition: background-color 0.3s;
    margin-top: 80px;

    &:hover {
        background-color: #673ab7;
    }

    &:active {
        background-color: #512da8;
    }
`;

// 색상 계산 함수
const interpolateColor = (score) => {
    const minScore = 20; // 오른쪽 끝 점수
    const maxScore = 100; // 왼쪽 끝 점수

    // 색상 값 (Red to Blue)
    const startColor = [255, 0, 0]; // Red
    const endColor = [0, 0, 255];   // Blue

    // 점수 비율
    const ratio = (score - minScore) / (maxScore - minScore);

    // 색상 보간
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * ratio);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * ratio);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * ratio);

    return `RGB(${r}, ${g}, ${b})`;
};

// percent 변환 함수
const getPercent = (score) => {
    const minScore = 20;
    const maxScore = 100;
    return ((score - minScore) / (maxScore - minScore)) * 100;
};

const GradientBoxWrapper = styled.div`
    height: 200px; /* 원하는 높이로 조정 */
    width: 100%; /* 부모 너비에 맞춤 */
    display: flex;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: -100px;
`;

const ColorInfoContainer = styled.div`
    text-align: center; /* 텍스트와 색상 원을 중앙 정렬 */
    background-color: black; /* 검정색 배경 */
    padding: 20px; /* 내부 여백 */
    border-radius: 15px; /* 모서리 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
    margin-top: 20px; /* 상단 여백 */
    max-width: 80%; /* 최대 너비 */
    width: 90%; /* 반응형 너비 */
    margin: 40px auto; /* 중앙 정렬 및 여백 추가 */
`;

const ColorCircle = styled.div`
    width: 150px; /* 동그라미의 너비 */
    height: 150px; /* 동그라미의 높이 */
    border-radius: 50%; /* 동그라미 모양 */
    background-color: ${(props) => props.color}; /* 동그라미 색상 */
    margin: 20px auto; /* 중앙 정렬 및 여백 추가 */
    border: 4px solid white; /* 흰색 테두리 추가 */
`;

const Propile = () => {
    const score = 40; // 예시 점수 (40점으로 설정)

    const percent = getPercent(score);
    const colorCode = interpolateColor(score);

    let testText;
    if (score === 60) {
        testText = "당신은 진보/보수 성향이 각각 50%입니다";
    } else if (score < 60) {
        testText = `당신은 보수 성향이 ${100 - percent}% 입니다`;
    } else {
        testText = `당신은 진보 성향이 ${percent}% 입니다`;
    }

    return (
        <PageWrapper>
            <InfoText>
                폴스널 컬러테스트 결과
            </InfoText>
            <TestText>
                {testText}
            </TestText>
            <GradientBoxWrapper>
                <GradientBox score={score} />
            </GradientBoxWrapper>
            <ColorInfoContainer>
                <AdditionalText>
                    당신의 폴스널 컬러
                </AdditionalText>
                <ColorCircle color={colorCode} />
                <AdditionalText>
                    <span style={{ color: colorCode, fontSize: '24px' }}>{colorCode}</span>
                </AdditionalText>
            </ColorInfoContainer>
            <NextButton>프로필 생성하기</NextButton>
        </PageWrapper>
    );
};

export default Propile;
