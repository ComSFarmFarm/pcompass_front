import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import WordCloud from 'react-wordcloud';
import { fetchCandidates, fetchPromiseSummary, fetchKeywords } from '../api';

// Import party SVG icons
import { ReactComponent as PartyIcon1 } from '../img/party/1.svg';
import { ReactComponent as PartyIcon2 } from '../img/party/2.svg';
import { ReactComponent as PartyIcon3 } from '../img/party/3.svg';
import { ReactComponent as PartyIcon4 } from '../img/party/4.svg';
import { ReactComponent as PartyIcon5 } from '../img/party/5.svg';
import { ReactComponent as PartyIcon6 } from '../img/party/6.svg';
import { ReactComponent as PartyIcon7 } from '../img/party/7.svg';

const Promises = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const selectedIcon = params.get('partyIcon');

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [wordCloudData, setWordCloudData] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        const loadCandidates = async () => {
            try {
                const data = await fetchCandidates();
                setCandidates(data);
            } catch (error) {
                console.error('후보자 목록을 불러오는 중 오류 발생:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCandidates();
    }, []);

    const handleCandidateClick = async (name, region) => {
        setSelectedCandidate({ name, region });
        setLoadingSummary(true);
        try {
            const summary = await fetchPromiseSummary(name, region);
            setSummary(summary);

            const keywords = await fetchKeywords(name, region);
            setWordCloudData(keywords);
        } catch (error) {
            console.error("공약 요약 또는 키워드 데이터를 가져오는 중 오류 발생:", error);
        } finally {
            setLoadingSummary(false);
        }
    };

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

    const partyToIconMap = {
        '개혁신당': '1',
        '국민의힘': '2',
        '더불어민주당': '3',
        '사회민주당': '4',
        '새로운미래': '5',
        '진보당': '6',
        '기타': '7',
    };

    const filteredCandidates = candidates.filter(candidate => {
        return partyToIconMap[candidate.party] === selectedIcon;
    });

    const wordCloudOptions = {
        colors: ['#333'],
        fontFamily: 'Roboto, sans-serif',
        fontSizes: [30, 70],  // Increase font size range
        rotationAngles: [-90, 0, 45, 90],
        scale: 'linear',
        padding: 4,
        spiral: 'archimedean',
        transitionDuration: 1000,
    };

    const getColor = (value) => {
        const opacity = Math.min(1, value / 100);
        return `rgba(0, 0, 0, ${opacity})`;
    };

    const getFontSize = (value) => {
        return Math.min(70, 30 + value / 4);  // Increase font size
    };

    const getFontWeight = (value) => {
        return Math.min(900, 300 + value / 10);
    };

    const transformedWordCloudData = wordCloudData.map(word => ({
        ...word,
        color: getColor(word.value),
        fontSize: getFontSize(word.value),
        fontWeight: getFontWeight(word.value),
    }));

    return (
        <PageWrapper>
            <InfoText>궁금한 후보자를 클릭해보세요.</InfoText>
            {renderPartyIcon() && (
                <IconOverlay>
                    {renderPartyIcon()}
                </IconOverlay>
            )}
            <ContentWrapper>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {filteredCandidates.length === 0 ? (
                            <p>후보자가 없습니다.</p>
                        ) : (
                            <CandidateTable>
                                {filteredCandidates.map((candidate, index) => (
                                    <CandidateButton
                                        key={index}
                                        onClick={() => handleCandidateClick(candidate.name, candidate.region)}
                                    >
                                        {candidate.name}
                                    </CandidateButton>
                                ))}
                            </CandidateTable>
                        )}
                        {loadingSummary && (
                            <LoadingWrapper>
                                <Loader />
                                <LoadingText>공약 요약 생성 중...</LoadingText>
                            </LoadingWrapper>
                        )}
                        {selectedCandidate && !loadingSummary && (
                            <>
                                {summary && (
                                    <SummaryWrapper>
                                        <h3>공약 요약:</h3>
                                        <p>{summary}</p>
                                    </SummaryWrapper>
                                )}
                                <WordCloudWrapper>
                                    <WordCloud
                                        words={transformedWordCloudData}
                                        options={wordCloudOptions}
                                    />
                                </WordCloudWrapper>
                            </>
                        )}
                    </>
                )}
            </ContentWrapper>
        </PageWrapper>
    );
};

// Styled Components
const InfoText = styled.div`
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 100px;
    text-align: center;
`;

const ContentWrapper = styled.div`
    position: relative;
    margin-top: 160px;
`;

const WordCloudWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 500px;
    position: relative;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);  // Adjust shadow for subtle effect
    padding: 20px;
    margin-top: 40px;
    margin-bottom: 400px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const IconOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none;
    margin-top: 280px;
    z-index: 1;
`;

const CandidateTable = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(auto-fill, minmax(60px, auto));
    gap: 15px;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
`;

const CandidateButton = styled.button`
    background-color: #333;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: #555;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }
`;

const SummaryWrapper = styled.div`
    margin-top: 40px;
    padding: 30px;
    background-color: #f4f4f4;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: #333;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    }

    h3 {
        font-size: 24px;
        font-weight: 600;
        color: #111;
        margin-bottom: 15px;
        border-bottom: 2px solid #333;
        padding-bottom: 8px;
        text-transform: uppercase;
    }

    p {
        font-size: 18px;
        line-height: 1.8;
        margin: 0;
        word-break: break-word;
    }
`;

const LoadingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;
`;

const Loader = styled.div`
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const LoadingText = styled.p`
    margin-top: 15px;
    font-size: 18px;
    color: #333;
`;

export default Promises;