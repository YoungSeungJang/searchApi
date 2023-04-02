import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    body {
        background-color: white;
        /* background-color: #E6DDCA; */
    }
    button {
        border: none;
    }
`;
export default GlobalStyles;
