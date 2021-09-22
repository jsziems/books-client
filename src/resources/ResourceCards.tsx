import React, { Component } from 'react'
import { Button, Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle } from 'reactstrap'
// import styled from 'styled-components'

import { Resource } from '../types'


type Props = {
    resources: Resource[]
    editResource: (resource: object) => void
    token: string
    updateOn: () => void
    fetchResources: () => void
}

export default class ResourceCards extends Component<Props, {}> {

    deleteResource = (resource: Resource ) => {
        fetch(`http://localhost:3000/book/${resource.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            })
        })
        .then(() => this.props.fetchResources())
    }

    render() {

        return (
            <>
                <div className="cards-container">
                    {this.props.resources.map(resource => {
                        return (
                            // ToDo: Change classname
                            <div className='testing'>
                                <Card >
                                    <CardImg variant="top" src="holder.js/100px160" />
                                    <CardBody>
                                        <CardTitle>{resource.title}</CardTitle>
                                        <p>{resource.author}</p>
                                        <p>{resource.topic}</p>
                                        <p>{resource.media}</p>
                                        <p>{resource.link}</p>
                                        <p>{resource.readStatus}</p>

                                        <Button onClick={() => {
                                            this.props.editResource(resource)
                                            this.props.updateOn()
                                        }}
                                        >Edit
                                        </Button>
                                        <Button onClick={() => {
                                            this.deleteResource(resource)
                                        }}
                                        >Delete
                                        </Button>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardFooter>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}