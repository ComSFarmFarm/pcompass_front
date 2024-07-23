import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RainbowSVG } from './img/rainbow.svg'; // Correct path
import { ReactComponent as CloseSVG } from './img/x.svg'; // Adjust path if needed
import { ReactComponent as LogoSVG } from './img/logo.svg'; // Adjust path to your logo SVG
import { ReactComponent as YesSVG } from './img/yes.svg'; // Import yes SVG
import { ReactComponent as NoSVG } from './img/no.svg'; // Import no SVG

// Styled components for the Main Page

const Page = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative; /* Added for absolute positioning */
    padding-bottom: 710px; /* Adjust this value as needed */
`;

const Logo = styled(LogoSVG)`
    position: absolute;
    top: 8px; /* Distance from the top */
    left: 20px; /* Distance from the left */
    width: 300px; /* Adjust size as needed */
    height: auto; /* Maintain aspect ratio */
`;

const LogoutButton = styled.button`
    width: 100px;
    height: 50px;
    border: none;
    font-weight: 700;
    font-size: 16px;
    background-color: #8528d4;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    position: absolute; /* Positioning the button absolutely */
    top: 20px; /* Distance from the top */
    right: 20px; /* Distance from the right */

    &:hover {
        background-color: #5d1a90;
    }
`;

const BoxContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px; /* Space between boxes */
    justify-content: center; /* Center the grid within the page */
    max-width: 1300px; /* Maximum width of the grid container */
    width: 100%; /* Full width up to max-width */
    padding: 20px;
    box-sizing: border-box;
    margin-top: 120px; /* Space from the top of the page */
`;

const Box = styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px; /* Increased padding for larger content area */
    text-align: center;
    max-width: 400px; /* Increased width of each box */
    width: 100%; /* Make the box full width up to max-width */
    position: relative; /* Needed for absolute positioning of CloseButton and SVGs */
    box-sizing: border-box; /* Ensures padding does not affect width calculation */
`;

const StyledRainbowSVG = styled(RainbowSVG)`
    margin-bottom: 20px; /* Space between the SVG and text */
`;

const PromoText = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: #262626;
    margin: 0 0 10px 0; /* Space below the text */
    margin-top: 25px;
`;

const AdditionalText = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: green; /* Green color for additional text */
    margin: 0;
    margin-top: 10px; /* Space between the original text and the additional text */
    margin-bottom: 20px; /* Space between the additional text and the SVG buttons */
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

    &:hover {
        background-color: #8528d4;
    }
    margin-top: 20px; /* Space between the text and button */
`;

const CloseButton = styled(CloseSVG)`
    position: absolute;
    top: 10px; /* Distance from the top of the box */
    right: 10px; /* Distance from the right side of the box */
    cursor: pointer;
    width: 24px; /* Adjust size as needed */
    height: 24px; /* Adjust size as needed */
`;

const YesButton = styled(YesSVG)`
    cursor: pointer;
    width: 300px; /* Increase size as needed */
    height: auto; /* Increase size as needed */
    margin-right: 10px; /* Reduced space between Yes and No button */
    margin-top: 10px;
`;

const NoButton = styled(NoSVG)`
    cursor: pointer;
    width: 300px; /* Increase size as needed */
    height: auto; /* Increase size as needed */
    margin-left: 0px; /* Reduced space between Yes and No button */
    margin-top: 10px;
`;

// Data for each box
const boxData = [
    {
        id: 1,
        text: (
            <>
                당신의 폴스널 컬러 테스트를 <br />
                받아보시겠습니까?
            </>
        ),
        buttonText: '받아보기',
    },
    {
        id: 2,
        text: (
            <>
                유죄가 확정된 범죄자들에게도<br />
                투표권을 가질 권리가 있을까요?
            </>
        ),
        additionalText: '>> 매일 푸는 정치 퀴즈 232,432,342명 참여중',
        buttonText: '그렇다',
    },
    {
        id: 3,
        text: '세 번째 컨테이너입니다. 다양한 색상을 시도해보세요.',
        buttonText: '시작하기',
    },
    {
        id: 4,
        text: '내 정치 점수',
        buttonText: '테스트하기',
    },
    {
        id: 5,
        text: '다섯 번째 컨테이너. 폴스널 컬러를 찾아보세요!',
        buttonText: '지금 시작',
    },
    {
        id: 6,
        text: '여섯 번째 컨테이너입니다. 나만의 색상을 발견해보세요.',
        buttonText: '체험하기',
    },
];

const Main = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout functionality
        navigate('/signin'); // Redirect to sign-in page or wherever necessary
    };

    const handleTestClick = (text) => {
        // Handle the "받아보기" button click with specific text
        alert(`버튼 클릭: ${text}`); // Replace with actual test functionality
    };

    const handleCloseClick = () => {
        // Handle the close button click
        alert('Close button clicked!'); // Replace with actual close functionality
    };

    const handleYesClick = () => {
        // Handle the Yes button click
        alert('Yes button clicked!'); // Replace with actual functionality
    };

    const handleNoClick = () => {
        // Handle the No button click
        alert('No button clicked!'); // Replace with actual functionality
    };

    return (
        <Page>
            <Logo />
            <BoxContainer>
                {boxData.map((data) => (
                    <Box key={data.id}>
                        <PromoText>{data.text}</PromoText>
                        {data.id === 2 && (
                            <>
                                <AdditionalText>{data.additionalText}</AdditionalText>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                    <YesButton onClick={handleYesClick} />
                                    <NoButton onClick={handleNoClick} />
                                </div>
                            </>
                        )}
                        <CloseButton onClick={handleCloseClick} />
                        {data.id === 1 && <StyledRainbowSVG width={148} height={107} />}
                        {data.id !== 2 && <TestButton onClick={() => handleTestClick(data.buttonText)}>{data.buttonText}</TestButton>}
                    </Box>
                ))}
            </BoxContainer>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Page>
    );
};

export default Main;