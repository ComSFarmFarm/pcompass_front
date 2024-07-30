// test.js
import React from 'react';
import PageWrapper from './PageWrapper'; // Adjust path to your PageWrapper component
import styled from 'styled-components';
import Rainbow from './components/Rainbow'; // Adjust path to your Rainbow component

const InfoText = styled.div`
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 0px;
`;

const TestText = styled.div`
    color: #8459FF;
    font-size: 24px;
    font-weight: bold;
    margin-top: 50px;
`;

const AdditionalText = styled.div`
    color: #fff;
    font-size: 20px;
    margin-top: 40px;
    line-height: 1.5;
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
    margin-bottom: 0px;
    transition: background-color 0.3s;
    margin-top: 120px;

    &:hover {
        background-color: #673ab7;
    }

    &:active {
        background-color: #512da8;
    }
`;

const Test = () => {
    return (
        <PageWrapper>
            <InfoText>
                폴스널 컬러테스트란?
            </InfoText>
            <Rainbow />
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
            <NextButton>다음</NextButton>
        </PageWrapper>
    );
};

export default Test;
