import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 라우팅 훅 임포트
import styled from 'styled-components';
import PageWrapper from './PageWrapper';
import { ReactComponent as MapSVG } from './img/map.svg';
import { ReactComponent as MapnameSVG } from './img/mapname.svg';
import { ReactComponent as RainbowSVG } from './img/rainbow.svg'; // Import Rainbow SVG

// Filtered data for each box (excluding ids 3, 5, 6)
const boxData = [
    {
        text: (
            <>
                당신의 폴스널 컬러 테스트를 <br />
                받아보시겠습니까?
            </>
        ),
        buttonText: '받아보기',
        svg: <RainbowSVG width={148} height={107} />, // SVG for box 1
        width: '500px', // Custom width for box 1
        height: '300px', // Custom height for box 1
    },
    {
        text: (
            <>
                유죄가 확정된 범죄자들에게도<br />
                투표권을 가질 권리가 있을까요?
            </>
        ),
        additionalText: '>> 매일 푸는 정치 퀴즈 232,432,342명 참여중',
        buttonText: '그렇다',
        svg: null, // No SVG for box 2
        width: '500px', // Custom width for box 2
        height: '200px', // Custom height for box 2
    },
    {
        text: '내 정치 점수',
        buttonText: '테스트하기',
        width: '500px', // Custom width for box 4
        height: '150px', // Custom height for box 4
    },
];

const Map = () => {
    const [isMapName, setIsMapName] = useState(false);
    const navigate = useNavigate(); // 라우팅 훅

    const handleToggleMap = () => {
        setIsMapName(prevIsMapName => !prevIsMapName);
    };

    const handleButtonClick = (buttonText) => {
        if (buttonText === '받아보기') {
            navigate('/main'); // '받아보기' 버튼 클릭 시 main 페이지로 이동
        } else {
            alert(`버튼 클릭: ${buttonText}`);
        }
    };

    return (
        <PageWrapper>
            <Container>
                {/* Display the appropriate map SVG based on the state */}
                <MapContainer>
                    {isMapName ? (
                        <MapnameSVG style={svgStyle} />
                    ) : (
                        <MapSVG style={svgStyle} />
                    )}
                </MapContainer>
                
                {/* Container boxes positioned to the right of the map */}
                <ContainerWrapper>
                    {boxData.map((data) => (
                        <StyledContainer 
                            key={data.id} 
                            width={data.width} 
                            height={data.height}
                        >
                            {data.svg && <SvgContainer>{data.svg}</SvgContainer>}
                            <PromoText>{data.text}</PromoText>
                            {data.additionalText && <AdditionalText>{data.additionalText}</AdditionalText>}
                            <TestButton onClick={() => handleButtonClick(data.buttonText)}>{data.buttonText}</TestButton>
                        </StyledContainer>
                    ))}
                </ContainerWrapper>
            </Container>

            {/* Button to toggle map */}
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
    align-items: flex-start; /* Align items to the top of the container */
    margin-top: 50px; /* Space from the top */
`;

const MapContainer = styled.div`
    flex-shrink: 0; /* Prevent shrinking of map container */
    margin-top: 50px;
`;

const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column; /* Stack boxes vertically */
    margin-left: 50px; /* Add margin to push boxes right */
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
    text-align: center; /* Center text within the button */
    box-sizing: border-box;
    margin-top: 100px;
    display: block; /* Ensure button is on a new line */
    margin-left: auto; /* Center button horizontally */
    margin-right: auto; /* Center button horizontally */

    &:hover {
        background-color: #8528d4;
    }
`;

const StyledContainer = styled.div`
    background-color: black;
    color: white;
    width: ${({ width }) => width || '400px'}; /* Use the width from props or default to 400px */
    height: ${({ height }) => height || '250px'}; /* Use the height from props or default to 250px */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px; /* Larger font size */
    border-radius: 20px;
    box-sizing: border-box;
    margin-left: 500px;
    margin-bottom: 30px; /* Increased space between the boxes */
    padding: 20px; /* Added padding */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for better appearance */
`;

const SvgContainer = styled.div`
    margin-bottom: 20px; /* Space between the SVG and text */
`;

const PromoText = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: white;
    margin: 0;
    text-align: center; /* Center text within the container */
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

    &:hover {
        background-color: #8528d4;
    }
`;

export default Map;
