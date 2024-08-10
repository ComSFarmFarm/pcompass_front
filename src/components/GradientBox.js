import React from 'react';
import styled, { keyframes } from 'styled-components';

// 동그라미가 왼쪽과 오른쪽으로 이동하는 애니메이션 정의
const move = keyframes`
  0% {
    left: 0;
  }
  50% {
    left: calc(100% - 30px); /* 동그라미의 너비만큼의 위치 조정 */
  }
  100% {
    left: 0;
  }
`;

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
    animation: ${move} 8s infinite; /* 애니메이션 적용, 무한 반복 */
    z-index: 1; /* 동그라미가 박스의 위에 위치하도록 설정 */
`;

const GradientBox = () => {
    return (
        <StyledGradientBox>
            <Dot />
        </StyledGradientBox>
    );
};

export default GradientBox;
