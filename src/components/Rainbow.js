import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RainbowSVG } from '../img/rainbow.svg'; // Adjust path to your rainbow SVG

const RainbowWrapper = styled.div`
    cursor: pointer;
`;

const StyledRainbow = styled(RainbowSVG)`
    width: 130px; /* Adjust width as needed */
    height: auto;
    margin-top: 50px; /* Space from the CommandText */
`;

const Rainbow = () => {
    const navigate = useNavigate();

    const handleRainbowClick = () => {
        navigate('/main');
    };

    return (
        <RainbowWrapper onClick={handleRainbowClick}>
            <StyledRainbow />
        </RainbowWrapper>
    );
};

export default Rainbow;
