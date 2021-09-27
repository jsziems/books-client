import React, { Component } from 'react';
import { Button, Container } from 'reactstrap'

import styled from 'styled-components'
import homeImage from '../assets/alexis-brown-omeaHbEFlN4-unsplash.jpeg'

// ToDo: Image not displaying.  Note:  Doesn't recognize file with above import.
const Homepage = styled.div`
background-image: url(${homeImage})
background-size: cover;
height: 100vh;
width: 100vw;
justify-content: center;
align-items: center;
`

export default class Home extends Component {
    handleClick = (e: React.FormEvent<HTMLFormElement>) => {

    }

    render() {
        return(
            <>
    
            <Container>
                <Homepage>
                    <p>Welcome!</p>
                    <Button>Click Here to Get Started</Button>
                    </Homepage>
            </Container>
            </>
        )
    }
}