import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import { ReactComponent as ChevronLeftSVG } from '../img/chevron-left.svg';
import { ReactComponent as RainbowSVG } from '../img/rainbow.svg';
import { ReactComponent as YesSVG } from '../img/yes.svg';
import { ReactComponent as NoSVG } from '../img/no.svg';
import { ReactComponent as NewsSVG } from '../img/news.svg';

// Import party SVG icons
import { ReactComponent as PartyIcon1 } from '../img/party/1.svg';
import { ReactComponent as PartyIcon2 } from '../img/party/2.svg';
import { ReactComponent as PartyIcon3 } from '../img/party/3.svg';
import { ReactComponent as PartyIcon4 } from '../img/party/4.svg';
import { ReactComponent as PartyIcon5 } from '../img/party/5.svg';
import { ReactComponent as PartyIcon6 } from '../img/party/6.svg';
import { ReactComponent as PartyIcon7 } from '../img/party/7.svg';

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
    {
        text: (
            <>
               [2024년 북한] 한반도 전쟁위기...<br />
               김정은 정말 도발할까?
            </>
        ),
        buttonText: null, // Changed from '최신 정치 이슈 보러가기' to null
        svg: <NewsSVG width={180} height={100} />,
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
        buttonText: null, // Changed from '공약 보러가기' to null
        width: '700px',
        height: '400px',
    },
    {
        text: '추가 컨테이너 2',
        buttonText: '버튼 2',
        width: '600px',
        height: '300px',
    },
];

const Main = () => {
    const navigate = useNavigate();

    const handleButtonClick = (buttonText) => {
        if (buttonText === '받아보기') {
            navigate('/First');
        } else {
            alert(`버튼 클릭: ${buttonText}`);
        }
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
                        <IconContainer>
                            <ChevronLeftSVG width={25} height={25} />
                        </IconContainer>
                        <TextContainer>
                            <PromoText>{data.text}</PromoText>
                            {data.additionalText && <AdditionalText>{data.additionalText}</AdditionalText>}
                        </TextContainer>
                        {data.svg && (
                            <SvgContainer>
                                {data.svg}
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
                            <TestButton onClick={() => handleButtonClick(data.buttonText)}>
                                {data.buttonText}
                            </TestButton>
                        )}
                        {data.icons && (
                            <IconContainerBelowText>
                                <IconGrid>
                                    {data.icons.map((icon, idx) => (
                                        <IconItem key={idx}>
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
`;

const SvgContainer = styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    border-radius: 20px; /* Adjust the border-radius as needed */
    overflow: hidden; /* Ensures that the rounded corners are applied to the SVG */
    width: fit-content; /* Adjusts width to fit the SVG content */
    height: fit-content; /* Adjusts height to fit the SVG content */
`;

const PromoText = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: white;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 0px;
`;

const AdditionalText = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: green;
    margin: 10px 0;
`;

const TestButton = styled.button`
    width: 180px;
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

// New styled components for icon grid
const IconGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

const IconItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Main;
