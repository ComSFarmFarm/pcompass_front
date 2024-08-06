import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import WordCloud from 'react-wordcloud';

// Import party SVG icons
import { ReactComponent as PartyIcon1 } from '../img/party/1.svg';
import { ReactComponent as PartyIcon2 } from '../img/party/2.svg';
import { ReactComponent as PartyIcon3 } from '../img/party/3.svg';
import { ReactComponent as PartyIcon4 } from '../img/party/4.svg';
import { ReactComponent as PartyIcon5 } from '../img/party/5.svg';
import { ReactComponent as PartyIcon6 } from '../img/party/6.svg';
import { ReactComponent as PartyIcon7 } from '../img/party/7.svg';

// Sample data for the word cloud
const words = [
    { text: '정치', value: 1000 },
    { text: '경제', value: 900 },
    { text: '사회', value: 800 },
    { text: '외교', value: 700 },
    { text: '법률', value: 600 },
    { text: '복지', value: 500 },
    { text: '미디어', value: 400 },
    { text: '교육', value: 300 },
    { text: '문화', value: 200 },
    { text: '건강', value: 100 },
];

// Sample candidate names
const candidateNames = [
    '김철수', '이영희', '박지민', '정수빈', '최민수', '강현아', '이승기', '윤아', 
    '오정희', '김하늘', '이상호', '박서준', '최지우', '정우성', '김태희', '한가인',
];

const Promises = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const selectedIcon = params.get('partyIcon');

    const renderPartyIcon = () => {
        switch (selectedIcon) {
            case '1':
                return <PartyIcon1 width={200} height={200} />;
            case '2':
                return <PartyIcon2 width={200} height={200} />;
            case '3':
                return <PartyIcon3 width={200} height={200} />;
            case '4':
                return <PartyIcon4 width={200} height={200} />;
            case '5':
                return <PartyIcon5 width={200} height={200} />;
            case '6':
                return <PartyIcon6 width={200} height={200} />;
            case '7':
                return <PartyIcon7 width={200} height={200} />;
            default:
                return null;
        }
    };

    return (
        <PageWrapper>
            <InfoText>궁금한 후보자를 클릭해보세요.</InfoText>
            {renderPartyIcon() && (
                <IconOverlay>
                    {renderPartyIcon()}
                </IconOverlay>
            )}
            <ContentWrapper>
                <CandidateTable>
                    {candidateNames.map((name, index) => (
                        <CandidateButton key={index}>
                            {name}
                        </CandidateButton>
                    ))}
                </CandidateTable>
                <WordCloudWrapper>
                    <WordCloud words={words} />
                </WordCloudWrapper>
            </ContentWrapper>
        </PageWrapper>
    );
};

const InfoText = styled.div`
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 100px;
`;

const ContentWrapper = styled.div`
    position: relative;
    margin-top: 130px; /* Adjust to move content further down */
`;

const WordCloudWrapper = styled.div`
    width: 100%;
    height: 500px;
    position: relative;
`;

const IconOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none; /* Allows clicks to pass through to the word cloud */
    margin-top: 250px;
    z-index: 1; /* Lower z-index to ensure it's behind the candidate table */
`;

// New styled components for candidate table
const CandidateTable = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr); /* 8 columns */
    grid-template-rows: repeat(2, auto); /* 2 rows */
    gap: 10px;
    width: 100%; /* Adjust width to fit content */
    max-width: 900px; /* Ensure the table doesn't exceed this width */
    margin: 0 auto; /* Center align horizontally */
    position: relative;
    z-index: 2; /* Higher z-index to ensure it's above the icon overlay */
`;

const CandidateButton = styled.button`
    background-color: #333;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: #555;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }
`;

export default Promises;
