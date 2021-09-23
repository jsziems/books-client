import React, { Component } from 'react';
import { Container } from 'reactstrap'

export default class Home extends Component {
    handleClick = (e: React.FormEvent<HTMLFormElement>) => {

    }

    render() {
        return(
            <>
    
            <Container>
                <h1>HOME</h1>
            </Container>
            </>
        )
    }
}