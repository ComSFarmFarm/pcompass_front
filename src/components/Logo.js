import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../img/logo.svg'; // Adjust path to your logo SVG

const LogoWrapper = styled.div`
    cursor: pointer;
`;

const StyledLogo = styled(LogoSVG)`
    width: 200px;
    height: auto;
    margin-top: 45px;
    margin-left: 50px;
`;

const Logo = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/map');
    };

    return (
        <LogoWrapper onClick={handleLogoClick}>
            <StyledLogo />
        </LogoWrapper>
    );
};

export default Logo;
