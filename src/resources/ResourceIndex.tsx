
import React, { Component } from 'react'
import { Col, Container, Input, Row } from 'reactstrap'

import { Resource } from '../types'
import ResourceCards from './ResourceCards'
import ResourceCreate from './ResourceCreate'
import ResourceEdit from './ResourceEdit'
import APIURL from '../helpers/environment'

import styled from 'styled-components'
import bookStack from '../assets/bookStack.jpg'

const BackgroundImg = styled.div`
    background-image: url(${bookStack});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    padding-top: 3rem;
    margin: auto;
    justify-content: center;
    align-items: center;
`

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
        // fetch('http://localhost:3000/book', {
        fetch(`${APIURL}/book`, {
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
            })
            .catch((err) => {
                console.info(err)
            })
    }

    editResource = (resource: object) => {
        this.setState({ resourceToEdit: resource })
    }

    updateOn = () => {
        this.setState({ updateActive: true })
    }

    updateOff = () => {
        this.setState({ updateActive: false })
    }

    componentDidMount = () => {
        this.fetchResources()
    }

    filterCards = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const value = target.value.toLowerCase()

        const filteredResources = this.state.allResources.filter
            (resource => (`${resource.title}`.toLowerCase().includes(value)
            ))
        this.setState({ resources: filteredResources })
    }

    render() {
        return (
            <BackgroundImg>
                <Container fluid={true}>
                    <Row>
                        <Col lg="4">
                            <ResourceCreate
                                fetchResources={this.fetchResources}
                                token={this.props.token}
                            />
                        </Col>
                        <Col lg='8'>
                            <div>
                                <Input placeholder="Search..." onChange={this.filterCards} />

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
            </BackgroundImg>
        )
    }
}