import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* Remove default margin and padding */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Ensure the body takes up full viewport height */
    html, body {
        height: 100%;
        background-color: black; /* Set background color to black */
        color: white; /* Default text color to white for better contrast */
    }
`;

export default GlobalStyle;
