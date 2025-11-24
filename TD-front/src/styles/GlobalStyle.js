import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Georgia', serif;
    background: #263238;
    color: #fff;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle; 