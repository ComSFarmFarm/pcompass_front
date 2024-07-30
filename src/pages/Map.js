import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import { ReactComponent as MapSVG } from '../img/map.svg';
import { ReactComponent as MapnameSVG } from '../img/mapname.svg';
import { ReactComponent as RainbowSVG } from '../img/rainbow.svg';
import { ReactComponent as YesSVG } from '../img/yes.svg';
import { ReactComponent as NoSVG } from '../img/no.svg';

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
        height: '280px',
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
        height: '250px',
    },
    {
        text: '내 정치 점수',
        buttonText: '테스트하기',
        width: '500px',
        height: '150px',
    },
];

const regionButtons = [
    '경기', '강원', '인천', 
    '서울', '충북', '충남',
    '세종', '대전', '경북',
    '대구', '전북', '광주',
    '전남', '경남', '울산',
    '부산', '제주'
];

const Map = () => {
    const [isMapName, setIsMapName] = useState(false);
    const [clickedRegion, setClickedRegion] = useState(null); // 클릭된 버튼 상태 관리
    const navigate = useNavigate();

    const handleToggleMap = () => {
        setIsMapName(prevIsMapName => !prevIsMapName);
    };

    const handleButtonClick = (buttonText) => {
        if (buttonText === '받아보기') {
            navigate('/main');
        } else {
            alert(`버튼 클릭: ${buttonText}`);
        }
    };

    const handleRegionClick = (region) => {
        setClickedRegion(region); // 클릭된 버튼 저장
        alert(`${region} 버튼 클릭됨`);
    };

    return (
        <PageWrapper>
            <Container>
                <MapContainer>
                    {isMapName ? (
                        <MapnameSVG style={svgStyle} />
                    ) : (
                        <MapSVG style={svgStyle} />
                    )}
                </MapContainer>

                <ButtonsContainer>
                    <ButtonGrid>
                        {regionButtons.map((region, index) => (
                            <RegionButton 
                                key={index} 
                                isClicked={clickedRegion === region}
                                onClick={() => handleRegionClick(region)}
                            >
                                {region}
                            </RegionButton>
                        ))}
                    </ButtonGrid>
                </ButtonsContainer>

                <ContentWrapper>
                    {boxData.map((data, index) => (
                        <StyledContainer
                            key={index}
                            width={data.width}
                            height={data.height}
                        >
                            {data.svg && <SvgContainer>{data.svg}</SvgContainer>}
                            <PromoText>{data.text}</PromoText>
                            {data.additionalText && <AdditionalText>{data.additionalText}</AdditionalText>}
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
                            {data.buttonText && <TestButton onClick={() => handleButtonClick(data.buttonText)}>{data.buttonText}</TestButton>}
                        </StyledContainer>
                    ))}
                </ContentWrapper>
            </Container>

            <StyledButton onClick={handleToggleMap}>
                {isMapName ? '지역명 끄기' : '지역명 보기'}
            </StyledButton>
        </PageWrapper>
    );
};

const svgStyle = {
    width: '600px',
    height: 'auto',
};

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 50px;
    margin-right: 40px;
`;

const MapContainer = styled.div`
    flex-shrink: 0;
    margin-top: 70px;
    margin-left: 0px;
    margin-right: 60px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    margin-right: 210px;
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    gap: 10px; /* Space between buttons */
    width: 100%;
    max-width: 600px; /* Adjust width as needed */
    margin-top: 20px; /* Space between button grid and other content */
`;

const RegionButton = styled.button`
    background-color: ${({ isClicked }) => (isClicked ? '#8528d4' : '#ffffff')}; /* 보라색 배경 색상 */
    color: ${({ isClicked }) => (isClicked ? '#ffffff' : '#000000')}; /* 흰색 텍스트 */
    border: 2px solid ${({ isClicked }) => (isClicked ? '#8528d4' : '#000000')}; /* 보라색 테두리 */
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;

    &:hover {
        background-color: ${({ isClicked }) => (isClicked ? '#8528d4' : '#f1f1f1')}; /* 보라색 배경 색상 */
        border-color: #8528d4; /* 보라색 테두리 */
    }
`;


const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
    flex: 1;
`;

const StyledButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 25px 0;
    width: calc(100% - 0px);
    max-width: 100%;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    box-sizing: border-box;
    margin-top: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;

    &:hover {
        background-color: #8528d4;
    }
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
    margin-top: 40px;
    margin-left: 150px;
    margin-bottom: -20px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SvgContainer = styled.div`
    margin-bottom: -5px;
`;

const PromoText = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: white;
    margin-top: 10px;
    text-align: center;
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
    margin-top: 20px;
    margin-bottom: 10px;
    &:hover {
        background-color: #8528d4;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: -20px;
    margin-bottom: -30px;
`;

const SvgButton = styled.div`
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.8;
    }
`;

export default Map;
