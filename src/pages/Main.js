import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import { fetchNewsTitles } from '../api'; // API 함수 임포트

import { ReactComponent as ChevronLeftSVG } from '../img/chevron-left.svg';
import { ReactComponent as RainbowSVG } from '../img/rainbow.svg';
import { ReactComponent as YesSVG } from '../img/yes.svg';
import { ReactComponent as NoSVG } from '../img/no.svg';

// Import party SVG icons
import { ReactComponent as PartyIcon1 } from '../img/party/1.svg';
import { ReactComponent as PartyIcon2 } from '../img/party/2.svg';
import { ReactComponent as PartyIcon3 } from '../img/party/3.svg';
import { ReactComponent as PartyIcon4 } from '../img/party/4.svg';
import { ReactComponent as PartyIcon5 } from '../img/party/5.svg';
import { ReactComponent as PartyIcon6 } from '../img/party/6.svg';
import { ReactComponent as PartyIcon7 } from '../img/party/7.svg';

// Define paths for each container
const paths = [
    '/First',
    '/Quiz',
    '/News',
    '/Promises',
    '/Search'
];

const boxData = [
    {
        text: (
            <>
                당신의 폴스널 컬러 테스트를 <br />
                받아보시겠습니까?
            </>
        ),
        buttonText: '받아보기',
        svg: <RainbowSVG width={120} height={107} />,
        width: '500px',
        height: '300px',
    },
    {
        text: (
            <>
                유죄가 확정된 범죄자들에게도<br />
                투표권을 가질 권리가 있을까요?
            </>
        ),
        additionalText: '>> 매일 푸는 정치 퀴즈 232,432,342명 참여중',
        buttonText: null,
        svg: null,
        width: '500px',
        height: '300px',
    },
    // 이 부분에서 API에서 받아온 데이터로 대체됩니다.
    {
        text: null, // 초기 값은 null로 설정
        buttonText: null,
        svg: null,
        width: '500px',
        height: '300px',
    },
    {
        text: '궁금한 후보자의 공약을 요약해서 보세요!',
        icons: [
            <PartyIcon1 width={150} height={150} />, // Increased size
            <PartyIcon2 width={150} height={150} />, // Increased size
            <PartyIcon3 width={150} height={150} />, // Increased size
            <PartyIcon4 width={150} height={150} />, // Increased size
            <PartyIcon5 width={150} height={150} />, // Increased size
            <PartyIcon6 width={150} height={150}/>, // Increased size
            <PartyIcon7 width={150} height={150}/>, // Increased size
        ],
        buttonText: null,
        width: '750px',
        height: '400px',
    },
    {
        text: '당신의 후보자를 추천해드립니다.',
        buttonText: '검색하기',
        additiontext: (
            <>
               *당신이 관심있는 키워드를 입력하면 <br />
               해당 키워드와 관련된 후보자들을 추천해드립니다.
            </>
        ),
        width: '600px',
        height: '400px',
    },
];

const Main = () => {
    const navigate = useNavigate();
    const [randomNews, setRandomNews] = useState(null);

    useEffect(() => {
        const fetchAndSetRandomNews = async () => {
            try {
                const newsData = await fetchNewsTitles(); // API에서 데이터 가져오기
                const randomIndex = Math.floor(Math.random() * newsData.length);
                setRandomNews(newsData[randomIndex]); // 랜덤으로 하나의 뉴스 선택
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };

        fetchAndSetRandomNews();
    }, []);

    const handleChevronClick = (path) => {
        navigate(path);
    };

    const handleButtonClick = (buttonText) => {
        if (buttonText === '받아보기') {
            navigate('/First');
        } else {
            alert(`버튼 클릭: ${buttonText}`);
        }
    };

    const handleIconClick = (index) => {
        navigate(`/Promises?partyIcon=${index + 1}`);
    };

    const handleNewsClick = (url) => {
        window.location.href = url;
    };

    return (
        <PageWrapper>
            <ContentWrapper>
                {boxData.map((data, index) => (
                    <StyledContainer
                        key={index}
                        width={data.width}
                        height={data.height}
                    >
                        <IconContainer onClick={() => handleChevronClick(paths[index])}>
                            <ChevronLeftSVG width={25} height={25} />
                        </IconContainer>
                        <TextContainer>
                            <PromoText onClick={() => index === 2 && randomNews ? handleNewsClick(randomNews.url) : null}>
                                {index === 2 && randomNews ? randomNews.title : data.text}
                            </PromoText>
                            {data.additionalText && <AdditionalText>{data.additionalText}</AdditionalText>}
                        </TextContainer>
                        {index === 2 && randomNews && (
                            <SvgContainer onClick={() => handleNewsClick(randomNews.url)}>
                                <img
                                    src={randomNews.imageUrl || `https://via.placeholder.com/150?text=No+Image`}
                                    alt="News"
                                    width={200}
                                    height={120}
                                    style={{ borderRadius: '20px' }}
                                />
                            </SvgContainer>
                        )}
                        {index === 1 && (
                            <ButtonContainer>
                                <SvgButton onClick={() => alert('Yes button clicked')}>
                                    <YesSVG width={170} height={170} />
                                </SvgButton>
                                <SvgButton onClick={() => alert('No button clicked')}>
                                    <NoSVG width={170} height={170} />
                                </SvgButton>
                            </ButtonContainer>
                        )}
                        {data.buttonText && data.buttonText !== null && (
                            <ButtonAndSearchContainer>
                                {data.buttonText === '검색하기' && (
                                    <>
                                        <TextWithSearch>
                                            {data.additiontext}
                                        </TextWithSearch>
                                        <SearchBar placeholder="관심있는 키워드를 입력하세요..." />
                                    </>
                                )}
                                <TestButton onClick={() => handleButtonClick(data.buttonText)}>
                                    {data.buttonText}
                                </TestButton>
                            </ButtonAndSearchContainer>
                        )}
                        {data.icons && (
                            <IconContainerBelowText>
                                <IconGrid>
                                    {data.icons.map((icon, idx) => (
                                        <IconItem key={idx} onClick={() => handleIconClick(idx)}>
                                            {icon}
                                        </IconItem>
                                    ))}
                                </IconGrid>
                            </IconContainerBelowText>
                        )}
                    </StyledContainer>
                ))}
            </ContentWrapper>
        </PageWrapper>
    );
};

// New styled component for additional text
const TextWithSearch = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: green;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 30px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
    gap: 20px;
`;

const StyledContainer = styled.div`
    background-color: black;
    color: white;
    width: ${({ width }) => width || '400px'};
    height: ${({ height }) => height || '250px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 20px;
    box-sizing: border-box;
    margin-top: 50px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const IconContainer = styled.div`
    position: absolute;
    top: 25px;
    right: 15px;
    cursor: pointer;
`;

const IconContainerBelowText = styled.div`
    margin-top: 20px; /* Space between text and icons */
    position: relative;
    z-index: 1;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top:15px;
`;

const SvgContainer = styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    border-radius: 20px;
    overflow: hidden;
        width: fit-content;
    height: fit-content;
    cursor: pointer; /* Add cursor pointer to indicate clickable */
`;

const PromoText = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: white;
    text-align: center;
    margin: 10px 50px;  /* 양옆에 마진 추가 */
    line-height: 1.4;  /* 줄 간격 조절 */
    overflow-wrap: break-word;  /* 긴 단어를 다음 줄로 넘어가게 함 */
    word-wrap: break-word;
    word-break: break-word;  /* 줄 바꿈 관련 속성 */
    white-space: normal;  /* 문장이 길 경우 다음 줄로 넘어가게 설정 */
    cursor: pointer; /* Add cursor pointer to indicate clickable */
`;

const AdditionalText = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: green;
    margin: 10px 0;
`;

const ButtonAndSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    gap: 17px;
`;

const SearchBar = styled.input`
    width: 220px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 0 10px;
    font-size: 14px;
    outline: none;
    margin-bottom: -10px;
    
    &:focus {
        border-color: #8528d4;
    }
`;

const TestButton = styled.button`
    width: 140px;
    height: 40px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    background-color: #626262;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 15px;
    margin-bottom: 15px;
    &:hover {
        background-color: #8528d4;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: -20px;
    margin-bottom: -20px;
`;

const SvgButton = styled.div`
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.8;
    }
`;

const IconGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

const IconItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        filter: brightness(0.6); 
    }
`;

export default Main;

