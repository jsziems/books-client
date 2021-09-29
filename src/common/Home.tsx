import React, { Component } from 'react';
import { Button, Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle, Container, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
// import fannedBook from '../assets/fannedBook.jpg'
import fannedBook from '../assets/fannedBookDk.jpg'

const BackgroundImg = styled.div`
    background-image: url(${fannedBook});
    background-size: cover;
    background-repeat: no-repeat;
    // opacity: .75;
    height: 100vh;
    width: 100vw;
    padding-top: 3rem;
    margin: auto;
    justify-content: center;
    align-items: center;
`
const Welcome = styled.h1`
    margin-top: 4rem;
    margin-bottom: 4rem;
    font-size: 7rem;
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
    background-color: white; //#033d68; //transparent;
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
                        {/* ToDo: Add Text */}
                        <Welcome>Welcome! </Welcome>
                        <WelcomeText>If you have a queue of books to read, podcasts to listen to, articles of interest, and videos that sound promising, you've come to the right place!  Developer Digest collects all that information for easy reference, and, provides a place to summarize and rate each item.  </WelcomeText>
                        <Link to='../Auth'>
                            <HomeButton>Click Here to Get Started</HomeButton>
                        </Link>
                        {/* <Row>
                            <Col md="3"></Col>
                            <Col md="6" className="create-col">
                                <Card>
                                    <CardImg top width="60%" src={homeImage} />
                                </Card>
                                
                            </Col>
                            <Col md="3"></Col>
                        </Row> */}
                    </Container>
                    </BackgroundImg>
                </div>
            </>
        )
    }
}