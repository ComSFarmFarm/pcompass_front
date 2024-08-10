import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper'; // PageWrapper 경로
import GradientBox from '../components/GradientBox'; // GradientBox 컴포넌트 임포트

const InfoText = styled.div`
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 200px; /* 상단 여백 */
`;

const TestText = styled.div`
    color: white;
    font-size: 30px;
    font-weight: bold;
    margin-top: 10px; /* 상단 여백 */
`;

const CommandText = styled.div`
    color: #F1D1FD;
    font-size: 25px;
    font-weight: bold;
    margin-top: 60px; /* 상단 여백 */
`;

const StyledButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 25px 0; /* 높이를 위한 패딩 증가 */
    width: calc(100% - 40px); /* 패딩을 고려한 전체 너비 */
    max-width: 100%; /* 최대 너비 없음 */
    font-size: 20px; /* 가독성을 위한 큰 폰트 사이즈 */
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center; /* 버튼 내 텍스트 중앙 정렬 */
    box-sizing: border-box; /* 패딩을 너비에 포함 */
    margin: 0px; /* 여백 추가 */
    margin-top: 286px;

    &:hover {
        background-color: #8528d4;
    }
`;

const ButtonText = styled.div`
    font-size: 18px; /* 버튼 높이에 맞는 큰 폰트 사이즈 */
    margin-top: 10px;
    color: #6e1aab;
    transition: color 0.3s;
`;

const GradientBoxWrapper = styled.div`
    height: 200px; /* 원하는 높이로 조정 */
    width: 100%; /* 부모 너비에 맞춤 */
    display: flex;
    justify-content: center;
    align-items: center; /* 내용 중앙 정렬 */
`;

const First = () => {
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
            <GradientBoxWrapper>
                <GradientBox /> {/* GradientBox 컴포넌트 추가 */}
            </GradientBoxWrapper>
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
