
import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Signup from './Signup'
import Login from './Login'


import styled from 'styled-components'
// import lightBooks from '../assets/lightBooks.jpg'
// import lightBooks from '../assets/lightBooksMd.jpg'
// import bookClub2 from '../assets/bookClub2.jpg'
import openBook from '../assets/openBook.jpg'

const BackgroundImg = styled.div`
    background-image: url(${openBook});
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

type AuthProps = {
    updateToken: (newToken: string) => void
    updateRole: (newRole: string) => void
}


export default class Auth extends Component<AuthProps, {}> {
    constructor(props: AuthProps) {
        super(props)
    }

    render() {
        console.info('In Auth')
        return (
            <>
            <BackgroundImg>
            <Container>
                    <Row>
                        <Col md='6' >
                            <Signup updateToken={this.props.updateToken} 
                            updateRole={this.props.updateRole}
                            />
                        </Col>
                        <Col md='6'>
                            <Login 
                                updateToken={this.props.updateToken} updateRole={this.props.updateRole}
                            />
                        </Col>
                    </Row>
                </Container>
            </BackgroundImg>
                
            </>
        )
    }
}