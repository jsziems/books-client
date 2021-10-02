import React, { Component } from 'react'
import { Button, Card, CardBody, CardImg, CardLink, CardTitle } from 'reactstrap'

import '../App.styles'

import bookClub from '../assets/bookClub.jpg'
import magazine from '../assets/magazine.jpg'
import headphones from '../assets/headphones.jpg'
import video from '../assets/video.jpg'
import book from '../assets/book.jpg'
import github from '../assets/github.jpg'

import { Resource } from '../types'
import APIURL from '../helpers/environment'

type Props = {
    resources: Resource[]
    editResource: (resource: object) => void
    token: string
    updateOn: () => void
    fetchResources: () => void
}

export default class ResourceCards extends Component<Props, {}> {

    deleteResource = (resource: Resource ) => {
        fetch(`${APIURL}/book/${resource.id}`, {
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
                                    {resource.media === 'Podcast' ? (
                                        <>
                                            <CardImg variant="top" src={headphones}/> 
                                        </>
                                    ) : resource.media === 'Article' ? (
                                        <>
                                            <CardImg variant="top" src={magazine}/> 
                                        </>
                                    ) :  resource.media === 'Video' ? (
                                        <>
                                            <CardImg variant="top" src={video}/>             
                                        </>
                                    ) : resource.media === 'Code Repository' ? (
                                        <>
                                            <CardImg variant="top" src={github}/>             
                                        </>
                                    ) : (
                                    <>
                                            <CardImg variant="top" src={book}/>             
                                        </>
                                    )
                                    }
                                    
                                    <CardBody className='card-body'>
                                    <CardTitle>{resource.title}</CardTitle>
                                        <p>{resource.author}</p>
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