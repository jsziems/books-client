import React, { Component } from 'react';
import { Button, Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle, Container, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import homeImage from '../assets/alexis-brown-omeaHbEFlN4-unsplash.jpeg'

const Welcome = styled.h1`
    margin-top: 5rem;
    margin-bottom: 5rem;
    color: #51958a;
`

const HomeButton = styled.button`
    margin-top: 2rem;
    margin: .5rem;
    border: 1px solid #51958a;
    border-radius: .3rem;
    background-color: transparent;
    color: #51958a;
`

export default class Home extends Component {
    handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    }

    render() {
        return (
            <>
                <div>
                    <Container>
                        {/* ToDo: Add Text */}
                        <Welcome>Welcome! </Welcome>
                        <Row>
                            <Col md="3"></Col>
                            <Col md="6" className="create-col">
                                <Card>
                                    <CardImg top width="60%" src={homeImage} />
                                </Card>
                                <Link to='../Auth'>
                                    <HomeButton>Click Here to Get Started</HomeButton>
                                </Link>
                            </Col>
                            <Col md="3"></Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}