import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import APIURL from '../helpers/environment'

type Props = {
    token: string
    resourceToEdit: any
    updateOff: () => void
    fetchResources: () => void
}

interface ResourceEditState {
    title: string,
    author: string,
    link: string,
    topic: string,
    media: string,
    readStatus: string,
    summary: string,
    rating: string
}

export default class ResourceEdit extends Component<Props, ResourceEditState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: this.props.resourceToEdit.title,
            author: this.props.resourceToEdit.author,
            link: this.props.resourceToEdit.link,
            topic: this.props.resourceToEdit.topic,
            media: this.props.resourceToEdit.media,
            readStatus: this.props.resourceToEdit.readStatus,
            summary: this.props.resourceToEdit.summary,
            rating: this.props.resourceToEdit.rating,
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value } as unknown as Pick<
            ResourceEditState, keyof ResourceEditState
        >)
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // fetch(`http://localhost:3000/book/${this.props.resourceToEdit.id}`, {
        fetch(`${APIURL}/book/${this.props.resourceToEdit.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: this.state.title,
                author: this.state.author,
                link: this.state.link,
                topic: this.state.topic,
                media: this.state.media,
                readStatus: this.state.readStatus,
                summary: this.state.summary,
                rating: this.state.rating
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            }),
        }).then(res => {
            this.props.fetchResources()
            this.props.updateOff()
        })
    }

    handleCancel = () => {
        this.props.fetchResources()
        this.props.updateOff()
    }

    render() {
        return (
            <div className='modal'>
                <Modal isOpen={true}>
                    <div className='modal-header'>
                        <ModalHeader>Update Your Selection</ModalHeader>
                    </div>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='title' sm={4}>Title:</Label>
                                <Col sm={10}>
                                    <Input
                                        name='title'
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    >
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='author' sm={4}>Author:</Label>
                                <Col sm={10}>
                                    <Input
                                        name='author'
                                        value={this.state.author}
                                        onChange={this.handleChange}
                                    >
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='link' sm={4}>Link:</Label>
                                <Col sm={10}>
                                    <Input
                                        name='link'
                                        value={this.state.link}
                                        onChange={this.handleChange}
                                    >
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='media'>Select Media:</Label>
                                <Col sm={10}>
                                    <Input
                                        type='select'
                                        name='media'
                                        value={this.state.media}
                                        onChange={this.handleChange}
                                    >
                                        <option value="Article">Article</option>
                                        <option value="Video">Video</option>
                                        <option value="Podcast">Podcast</option>
                                        <option value="Code Repository">Code Repository</option>
                                        <option value="Book">Book</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <Row>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label htmlFor='readStatus'>Select Status:</Label>
                                        <Input
                                            type='select'
                                            name='readStatus'
                                            value={this.state.readStatus}
                                            onChange={this.handleChange}
                                        >
                                            <option value="Not started">Not started</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Finished">Finished</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label htmlFor='rating'>Select Rating:</Label>
                                        <Input
                                            type='select'
                                            name='rating'
                                            value={this.state.rating}
                                            onChange={this.handleChange}
                                        >
                                            <option value="Not Rated">Not Rated</option>
                                            <option value="Meh">Meh</option>
                                            <option value="Good">Good</option>
                                            <option value="Excellent">Excellent</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup row>
                                <Label htmlFor='summary' sm={4}>Summary:</Label>
                                <Col sm={10}>
                                    <Input
                                        name='summary'
                                        value={this.state.summary}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <Button type='submit'>Update</Button>
                            <Button onClick={this.handleCancel}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}
