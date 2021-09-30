import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`


    body  {
        margin: 0;
        padding: 0;
        padding-top: 70px;
        display: flex;
        justify-content: center;
        text-align: center;
        background-color: #033d68; 
        color: white; 
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

    .card-button {
        font-size: 1rem;
        margin: .2rem;

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
        color: #033d68;
    }

    `
