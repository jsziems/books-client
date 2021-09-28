import React, { Component } from 'react'
import { Button, Card, CardBody, CardImg, CardLink, CardText, CardTitle } from 'reactstrap'

import '../App.styles'
import bookPath from '../assets/bookPath.jpg'
import bookClub from '../assets/bookClub.jpg'
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
                    {this.props.resources.map((resource, resourceId)  => {
                        return (
                            <div className='card-div'>
                                <Card key={resourceId}>
                                    <CardImg variant="top" src={bookClub}/>
                                    <CardBody>
                                    <CardTitle>{resource.title}</CardTitle>
                                        <p>{resource.author}</p>
                                        <p>{resource.media}</p>
                                        <CardLink href={resource.link} target='_blank'>Link</CardLink>
                                        <p>{resource.readStatus}</p>

                                        <Button className='card-button' onClick={() => {
                                            this.props.editResource(resource)
                                            this.props.updateOn()
                                        }}
                                        >Edit
                                        </Button>
                                        <Button className='card-button' onClick={() => {
                                            this.deleteResource(resource)
                                        }}
                                        >Delete
                                        </Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}