// src/pages/Main.js
import React from 'react';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper'; // Correct path to PageWrapper
import newsImage from '../img/news.svg'; // Import the image

const InfoText = styled.div`
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 80px; /* Space from the top */
    margin-bottom: 80px;
`;

const Container = styled.div`
    width: 60%;
    height: 200px;
    background-color: black;
    margin: 30px 0;
    display: flex;
    align-items: center;
    border-radius: 20px;
    overflow: hidden; /* To ensure the border radius is applied to the image as well */
    color: #fff;
`;

const ImageWrapper = styled.div`
    width: 30%;
    height: 100%;
    background-color: #444;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Content = styled.div`
    width: 70%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Headline = styled.h2`
    font-size: 24px;
    margin: 0 0 10px 0;
`;

const Description = styled.p`
    font-size: 16px;
    margin: 15px 40px 10px 40px;
`;

const News = () => {
    const containers = Array.from({ length: 10 }, (_, index) => (
        <Container key={index}>
            <ImageWrapper>
                <img 
                    src={index === 0 ? newsImage : `https://via.placeholder.com/150?text=Image+${index + 1}`} 
                    alt={index === 0 ? 'News Image' : `Image ${index + 1}`} 
                />
            </ImageWrapper>
            <Content>
                <Headline>
                    {index === 0 ? '[2024년 북한] 한반도 전쟁위기...김정은 정말 도발할까?' : `기사 헤드라인 ${index + 1}`}
                </Headline>
                <Description>
                    {index === 0
                        ? '김정은 북한 국무위원장은 지난해 연말 전원회의에서 "대한민국 것들과는 통일이 성사될 수 없다"며 유사시 핵무기 공격도 불사할 것이라고 위협했다. 출처 : 시사주간(http://www.sisaweekly.com)'
                        : `이것은 기사 ${index + 1}의 설명입니다. 최신 정치 이슈에 대한 간략한 설명을 여기에 표시합니다.`}
                </Description>
            </Content>
        </Container>
    ));

    return (
        <PageWrapper>
            <InfoText>
                최신 정치 이슈
            </InfoText>
            {containers}
        </PageWrapper>
    );
};

export default News;
