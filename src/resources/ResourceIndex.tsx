import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'

import ResourceCreate from './ResourceCreate'

type Props = {
    token: string
}

interface ResourceIndexState {

}

export default class ResourceIndex extends Component<Props, ResourceIndexState> {
    constructor(props: Props) {
        super(props)
        this.state = {

        }
    }

    fetchResources = () => {
        console.info ('In fetchResources')
    }
    
    render() {
        return (
            <Container>
            <Row>
                <Col md="3">
                    <ResourceCreate fetchResources={this.fetchResources} token={this.props.token} />
                </Col>
            </Row>
        </Container>
        )
    }
}