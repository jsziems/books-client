import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

// .App {
//     // width: 100%;
//     text-align: center;
// }

    body  {
        // width: 100%;
        margin: 0;
        padding: 0;
        padding-top: 70px;
        display: flex;
        justify-content: center;
        text-align: center;
        background-color: #033d68; //#a7b0b1;  //2F4454;
        color: white; //#51958A; //#239023; // #269e26; // #238323 //#32cd32;
    }

    h2 {
        color: #7A8791;
    }

    h4 {
        color: #51958a;
    }

    button {
        margin: .5rem;
        border: 1px solid white;
        border-radius: .3rem;
        background-color: #7A8791;
        color: white;

    }

    
    `
