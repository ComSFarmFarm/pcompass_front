import React from 'react';
import styled from 'styled-components';

// 점수에 따라 동그라미의 위치를 계산하는 함수
const getDotPosition = (score) => {
    const minScore = 20; // 오른쪽 끝 점수
    const maxScore = 100; // 왼쪽 끝 점수
    const positionPercentage = (score - minScore) / (maxScore - minScore) * 100;
    return `calc(${positionPercentage}% - 15px)`; // 동그라미의 너비의 절반을 조정값으로 사용
};

const StyledGradientBox = styled.div`
    width: 80%;
    height: 30px;
    margin-top: 20px;
    background: linear-gradient(to right, red, blue);
    border-radius: 10px;
    position: relative; /* 자식 요소의 위치를 조절하기 위해 상대 위치 지정 */
    overflow: visible; /* 자식 요소가 부모 요소를 벗어나도 보이도록 설정 */
`;

const Dot = styled.div`
    position: absolute;
    width: 30px; /* 동그라미의 너비 */
    height: 30px; /* 동그라미의 높이 */
    border-radius: 50%; /* 원형으로 만들기 */
    background: white;
    left: ${(props) => getDotPosition(props.score)};
    top: 50%;
    transform: translateY(-50%);
    z-index: 1; /* 동그라미가 박스의 위에 위치하도록 설정 */
`;

const GradientBox = ({ score }) => {
    return (
        <StyledGradientBox>
            <Dot score={score} />
        </StyledGradientBox>
    );
};

export default GradientBox;
