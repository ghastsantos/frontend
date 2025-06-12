import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, input, button, textarea, select {
        font-family: 'Rubik', sans-serif;
        font-size: 16px;
        outline: none;
        background-color: #1a1a1a;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }

    select {
        width: 100%;
        padding: 16px;
        border-radius: 10px;
        border: none;
        margin-bottom: 8px;
    }
`;