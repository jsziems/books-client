import React, { Component } from 'react';
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import fannedBook from '../assets/fannedBookDk.jpg'

const BackgroundImg = styled.div`
    background-image: url(${fannedBook});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    padding-top: 3rem;
    margin: auto;
    justify-content: center;
    align-items: center;
`
const WelcomeBrand = styled.h1`
    margin-bottom: 2rem;
    font-size: 5rem;
`

const Welcome = styled.h2`
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-size: 3rem;
    color: white;
`

const WelcomeText = styled.p`
    font-size: 1.9rem;
    margin-left: 4rem;
    margin-right: 4rem;
    `

const HomeButton = styled.button`
    margin-top: 2rem;
    margin: .5rem;
    border: 1px solid white;
    border-radius: .3rem;
    background-color: white;
    color: #26272D;
`

export default class Home extends Component {
    handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    }

    render() {
        return (
            <>
                <div>
                    <BackgroundImg>
                    <Container>
                        <Welcome>Welcome to </Welcome>
                        <WelcomeBrand>Developer Digest</WelcomeBrand>
                        <WelcomeText>If you have a queue of books to read, podcasts to listen to, articles of interest, and videos that sound promising, you've come to the right place!  Developer Digest collects all that information for easy reference, and, provides a place to summarize and rate each item.  </WelcomeText>
                        <Link to='../Auth'>
                            <HomeButton>Click Here to Get Started</HomeButton>
                        </Link>
                    </Container>
                    </BackgroundImg>
                </div>
            </>
        )
    }
}