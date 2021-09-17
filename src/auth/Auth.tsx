import { render } from '@testing-library/react';
import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Signup from './Signup'
import Login from './Login'

// QUESTION - can the updateToken prop below be renamed so there's less redundancy, or does it need to match a variable /function name somewhere else in the code?
type AuthProps = {
    updateToken: (newToken: string) => void
}

type AuthState = {}

export default class Auth extends Component<AuthProps, {}> {
    constructor(props: AuthProps) {
        super(props)
    }

    render() {
        console.info('In Auth')
        return (
            <>
                <Container>
                    <Row>
                        <Col md='6' >
                            <Signup updateToken={this.props.updateToken} />
                        </Col>
                        <Col md='6'>
                            <Login updateToken={this.props.updateToken} />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}