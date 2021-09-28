import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`


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
        color: #033d68;
    }

    button {
        margin: .5rem;
        border: 1px solid white;
        border-radius: .3rem;
        background-color: #7A8791;
        color: white;
    }

    .cards-container {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
    }
      
    .card-div {
        margin: 1rem 1rem;
        width: 25%;
        color: black;
    }
    
    .modal-header {
        background-color: #033d68;
        color: white;
        text-align: center;
        justify-content: center;

    }
    .modal {
        color: black;
        justify-content: left;
        text-align: left;
        font-size: .9rem;
    }

    .label {
        display: flex;
    }

    `
