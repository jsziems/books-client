import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'

import ResourceCards from './ResourceCards'
import ResourceCreate from './ResourceCreate'
import ReadStatusModal from './ReadStatusModal'
type Props = {
    token: string
}

interface ResourceIndexState {
    resources: []
}

export default class ResourceIndex extends Component<Props, ResourceIndexState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            resources: []
        }
    }

    fetchResources = () => {
        console.info('In fetchResources')
        fetch('http://localhost:3000/book', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            }),
        })
            .then((res) => res.json())
            .then((resourceData) => {
                this.setState({ resources: resourceData })
                console.log(resourceData)
            })
            .catch((err) => {
                console.info(err)
            })
    }

    componentDidMount = () => {
        this.fetchResources()
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <ResourceCreate fetchResources={this.fetchResources} token={this.props.token} />
                    </Col>
                    <Col md='9'>
                        <ResourceCards
                            resources={this.state.resources}
                            token={this.props.token}
                            fetchResources={this.fetchResources} />
                    </Col>
                </Row>
                
            </Container>
        )
    }
}