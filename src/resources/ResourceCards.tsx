import React, { Component } from 'react'
import { Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle } from 'reactstrap'
// import styled from 'styled-components'

import { Resource } from '../types'

// const OneCard = styled.Card `
//     background-color: yellow;
// `



type Props = {
    token: string
    resources: Resource[]
    fetchResources: () => void
}

export default class ResourceCards extends Component<Props, {}> {
    render() {
        return (
            <>
                <div className="cards-container">
                    <CardGroup >
                        {this.props.resources.map(resource => {
                            return (
                                <Card >
                                    <CardImg variant="top" src="holder.js/100px160" />
                                    <CardBody>
                                        <CardTitle>{resource.title}</CardTitle>
                                        <CardText>
                                            This is a wider card with supporting text below as a natural lead-in to
                                            additional content. This content is a little bit longer.
                                        </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </CardGroup>
                </div>
            </>
        )
    }
}