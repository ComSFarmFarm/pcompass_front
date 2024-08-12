import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper'; // Correct path to PageWrapper
import { fetchNewsTitles } from '../api'; // API 함수 임포트

const InfoText = styled.div`
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 80px; /* Space from the top */
    margin-bottom: 80px;
`;

const Container = styled.div`
    width: 70%;
    height: 200px;
    background-color: black;
    margin: 30px 0;
    display: flex;
    align-items: center;
    border-radius: 20px;
    overflow: hidden; /* To ensure the border radius is applied to the image as well */
    color: #fff;
    cursor: pointer; /* 클릭 가능한 컨테이너로 표시 */
    &:hover {
        background-color: #333; /* 마우스 오버 시 배경색 변화 */
    }
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
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Headline = styled.h2`
    font-size: 24px;
    margin: 10px 40px 10px 40px;
`;

const Description = styled.p`
    font-size: 16px;
    margin: 10px 50px 10px 40px;
`;

const News = () => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await fetchNewsTitles(); // API에서 데이터 가져오기
                setNewsData(data);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };

        fetchNews();
    }, []);

    const handleContainerClick = (url) => {
        if (url) {
            window.location.href = url; // 해당 URL로 이동
        }
    };

    return (
        <PageWrapper>
            <InfoText>
                최신 정치 이슈
            </InfoText>
            {newsData.map((news, index) => (
                <Container 
                    key={index} 
                    onClick={() => handleContainerClick(news.url)} // 클릭 이벤트 추가
                >
                    <ImageWrapper>
                        <img 
                            src={news.imageUrl || `https://via.placeholder.com/150?text=No+Image`} 
                            alt={`News ${index + 1}`} // "Image"를 제거한 alt 속성
                        />
                    </ImageWrapper>
                    <Content>
                        <Headline>
                            {news.title}
                        </Headline>
                        <Description>
                            {news.text}
                        </Description>
                    </Content>
                </Container>
            ))}
        </PageWrapper>
    );
};

export default News;
