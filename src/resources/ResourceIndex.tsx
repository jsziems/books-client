import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'

import ResourceCards from './ResourceCards'
import ResourceCreate from './ResourceCreate'
import ResourceEdit from './ResourceEdit'


type Props = {
    token: string
}

interface ResourceIndexState {
    resources: []
    resourceToEdit: object
    updateActive: boolean
}

export default class ResourceIndex extends Component<Props, ResourceIndexState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            resources: [],
            resourceToEdit: {},
            updateActive: false
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

    editResource = (resource: object) => {
        this.setState({ resourceToEdit: resource })
        console.log(resource)
    }

    updateOn = () => {
        console.info(`In updateOn - updateActive is ${this.state.updateActive}`)
        this.setState({ updateActive: true })
    }

    updateOff = () => {
        console.info(`In updateOff - updateActive is ${this.state.updateActive}`)
        this.setState({ updateActive: false })
    }

    componentDidMount = () => {
        this.fetchResources()
    }

    render() {
        console.info('In ResouceIndex')
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <ResourceCreate 
                            fetchResources={this.fetchResources} 
                            token={this.props.token} 
                        />
                    </Col>
                    <Col md='9'>
                        <ResourceCards
                            resources={this.state.resources}
                            editResource={this.editResource}
                            token={this.props.token}
                            updateOn={this.updateOn}
                            fetchResources={this.fetchResources} 
                        />
                    </Col>
                    { this.state.updateActive && this.state.resourceToEdit
                        ? ( <ResourceEdit
                                 token={this.props.token}
                                 resourceToEdit={this.state.resourceToEdit}
                                 updateOff={this.updateOff}
                                 fetchResources={this.fetchResources}
                            />
                        )
                        : ( <> </> ) }
                </Row>
                
            </Container>
        )
    }
}