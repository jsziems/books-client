import React, { Component } from 'react'
import { Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle } from 'reactstrap'

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

    
    render() {
        return (
            <>
{/* NOT WORKING!  Got from Card Groups here:  https://react-bootstrap.github.io/components/cards/ . Changed from dot notation in component names to Pascal Case (not sure if that breaks it), but didn't change any content. */}
                <CardGroup>
                    <Card>
                        <CardImg variant="top" src="holder.js/100px160" />
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardText>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardImg variant="top" src="holder.js/100px160" />
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardText>
                                This card has supporting text below as a natural lead-in to additional
                                content.{' '}
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardImg variant="top" src="holder.js/100px160" />
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardText>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </CardFooter>
                    </Card>
                </CardGroup>
            </>
        )
    }
}