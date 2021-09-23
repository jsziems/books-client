
import React, { Component } from 'react'
import { Button, Col, Container, Input, Row } from 'reactstrap'

import { Resource } from '../types'
import ResourceCards from './ResourceCards'
import ResourceCreate from './ResourceCreate'
import ResourceEdit from './ResourceEdit'


type Props = {
    token: string
}

interface ResourceIndexState {
    resources: Resource[]
    allResources: Resource[]
    resourceToEdit: object
    updateActive: boolean
}

export default class ResourceIndex extends Component<Props, ResourceIndexState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            resources: [],
            allResources: [],
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
                this.setState({ allResources: resourceData })
                this.setState({ resources: resourceData })
                console.info(resourceData)
            })
            .catch((err) => {
                console.info(err)
            })
    }

    editResource = (resource: object) => {
        this.setState({ resourceToEdit: resource })
        console.info(resource)
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

    filterCards = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.info('In ResourceIndex filterCards')
        const target = e.target
        const value = target.value.toLowerCase()

        const filteredResources = this.state.allResources.filter
            (resource => (`${resource.title}`.toLowerCase().includes(value)
            ))
        this.setState({ resources: filteredResources })
    }

    // addResource = () => {
    //     <ResourceCreate
    //         fetchResources={this.fetchResources}
    //         token={this.props.token}
    //     />
    // }

    render() {
        console.info('In ResouceIndex')
        return (
            <Container>
                {/* <div>
                <Row>
                    <Button onClick={() => {this.addResource()}}>
                        Add a Resource
                    </Button>
                </Row>
                </div> */}


                <Row>
                    <Col md="3">
                        <ResourceCreate 
                            fetchResources={this.fetchResources} 
                            token={this.props.token} 
                        />
                    </Col>
                    <Col md='9'>
                        <div>
                            <Input className='search-box' placeholder="Search..." onChange={this.filterCards} />


                            <ResourceCards
                                resources={this.state.resources}
                                editResource={this.editResource}
                                token={this.props.token}
                                updateOn={this.updateOn}
                                fetchResources={this.fetchResources}
                            />
                        </div>
                    </Col>
                    {this.state.updateActive && this.state.resourceToEdit
                        ? (<ResourceEdit
                            token={this.props.token}
                            resourceToEdit={this.state.resourceToEdit}
                            updateOff={this.updateOff}
                            fetchResources={this.fetchResources}
                        />
                        )
                        : (<> </>)}
                </Row>

            </Container>
        )
    }
}