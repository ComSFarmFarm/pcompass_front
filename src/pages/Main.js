import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import GradientBox from '../components/GradientBox'; // Import GradientBox

import { fetchNewsTitles, fetchQuizQuestion } from '../api'; // Add fetchQuizQuestion import

import { ReactComponent as ChevronLeftSVG } from '../img/chevron-left.svg';
import { ReactComponent as RainbowSVG } from '../img/rainbow.svg';

import { ReactComponent as PartyIcon1 } from '../img/party/1.svg';
import { ReactComponent as PartyIcon2 } from '../img/party/2.svg';
import { ReactComponent as PartyIcon3 } from '../img/party/3.svg';
import { ReactComponent as PartyIcon4 } from '../img/party/4.svg';
import { ReactComponent as PartyIcon5 } from '../img/party/5.svg';
import { ReactComponent as PartyIcon6 } from '../img/party/6.svg';
import { ReactComponent as PartyIcon7 } from '../img/party/7.svg';

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
        hasGradientBox: true, // Add a flag to indicate this box has a gradient box
    },
    {
        text: null, // To be updated with quiz question
        additionalText: '>> 매일 푸는 정치 퀴즈 232,432,342명 참여중',
        buttonText: null,
        svg: null,
        width: '500px',
        height: '300px',
        hasQuiz: true, // Flag to indicate this box will show quiz options
    },
    {
        text: null,
        buttonText: null,
        svg: null,
        width: '500px',
        height: '300px',
    },
    {
        text: '궁금한 후보자의 공약을 요약해서 보세요!',
        icons: [
            <PartyIcon1 width={150} height={150} />,
            <PartyIcon2 width={150} height={150} />,
            <PartyIcon3 width={150} height={150} />,
            <PartyIcon4 width={150} height={150} />,
            <PartyIcon5 width={150} height={150} />,
            <PartyIcon6 width={150} height={150} />,
            <PartyIcon7 width={150} height={150} />,
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
    const [quiz, setQuiz] = useState({ question: '', options: {} });

    useEffect(() => {
        const fetchAndSetRandomNews = async () => {
            try {
                const newsData = await fetchNewsTitles();
                const randomIndex = Math.floor(Math.random() * newsData.length);
                setRandomNews(newsData[randomIndex]);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };

        const fetchAndSetQuiz = async () => {
            try {
                const quizData = await fetchQuizQuestion();
                setQuiz({
                    question: quizData.question,
                    options: quizData.options,
                });
            } catch (error) {
                console.error('Failed to fetch quiz question', error);
            }
        };

        fetchAndSetRandomNews();
        fetchAndSetQuiz();
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

    const handleQuizOptionClick = (option) => {
        alert(`선택한 옵션: ${option}`);
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
                            {index === 1 && data.hasQuiz ? (
                                <>
                                    <PromoText>
                                        {quiz.question}
                                    </PromoText>
                                    <AdditionalText>{data.additionalText}</AdditionalText>
                                </>
                            ) : (
                                <PromoText onClick={() => index === 2 && randomNews ? handleNewsClick(randomNews.url) : null}>
                                    {index === 2 && randomNews ? randomNews.title : data.text}
                                </PromoText>
                            )}
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
                        {index === 1 && data.hasQuiz && (
                            <ButtonContainer>
                                {Object.entries(quiz.options).map(([key, value]) => (
                                    <Button
                                        key={key}
                                        onClick={() => handleQuizOptionClick(value)}
                                    >
                                        {value}
                                    </Button>
                                ))}
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
                        {data.hasGradientBox && (
                            <GradientBox />
                        )}
                    </StyledContainer>
                ))}
            </ContentWrapper>
        </PageWrapper>
    );
};

// Styled Components
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
    margin-top: 20px;
    position: relative;
    z-index: 1;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

const SvgContainer = styled.div`
    margin-top: 15px;
    margin-bottom: 20px;
    border-radius: 20px;
    overflow: hidden;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
`;

const PromoText = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: white;
    text-align: center;
    margin: 10px 50px;
    line-height: 1.4;
    max-width: 100%; /* Ensures the text does not overflow the container */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limit to 3 lines */
    -webkit-box-orient: vertical;
    white-space: normal;
    cursor: pointer;
`;

const AdditionalText = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: green;
    margin: 10px 0;
    margin-bottom: 40px;
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
    margin-top: 0; /* Adjusted to move buttons up */
    margin-bottom: 20px; /* Adjusted to provide space below buttons */
`;

const Button = styled.button`
    width: 120px;
    height: 50px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    background-color: #6a0dad;
    color: white;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: #5c00b4;
        transform: scale(1.05);
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
