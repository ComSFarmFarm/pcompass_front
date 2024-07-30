// src/components/StyledMapSVG.js
import styled from 'styled-components';
import { ReactComponent as MapSVG } from '../img/map.svg'; // Adjust path if necessary

const StyledMapSVG = styled(MapSVG)`
    width: 100%;
    height: auto;

    path {
        fill: #818283; /* Example color for paths */
        stroke: #FBFCFC;
        stroke-width: 0.333333;
    }
`;

export default StyledMapSVG;
