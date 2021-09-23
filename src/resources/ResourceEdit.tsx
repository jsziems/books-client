import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';


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

        this.setState( { [name]: value} as unknown as Pick<
            ResourceEditState, keyof ResourceEditState
            >)
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`http://localhost:3000/book/${this.props.resourceToEdit.id}`, {
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

    render() {
        console.info('In ResourceEdit')
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>Update your Selection</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                        <Label htmlFor='title'>Title:</Label>
                        <Input 
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label htmlFor='readStatus'>Enter the Status:</Label>
                        <Input 
                            name='readStatus'
                            value={this.state.readStatus}
                            onChange={this.handleChange}
                        />
                        </FormGroup>
                        <Button type='submit'>Update</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
