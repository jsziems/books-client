
import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import APIURL from '../helpers/environment'

type Props = {
    fetchResources: () => void
    token: string
}

interface ResourceCreateState {
    title: string,
    author: string,
    link: string,
    topic: string,
    media: string,
    readStatus: string,
    summary: string,
    rating: string
}

export default class ResourceCreate extends Component<Props, ResourceCreateState>{
    constructor(props: Props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            link: '',
            topic: '',
            media: 'Article',
            readStatus: 'Not Started',
            summary: '',
            rating: 'Not rated'
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value } as unknown as Pick<ResourceCreateState,
            keyof ResourceCreateState
        >)
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        // fetch('http://localhost:3000/book/create', {
        fetch(`${APIURL}/book/create`, {
            method: 'POST',
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
        })
            .then(res => res.json())
            .then(bookData => {
                this.setState({
                    title: '',
                    author: '',
                    link: '',
                    topic: '',
                    media: 'Article',
                    readStatus: 'Not Started',
                    summary: '',
                    rating: 'Not rated'
                })
                this.props.fetchResources()
            })
    }

    handleCancel = () => {
        this.props.fetchResources()
    }

    render() {
        return (
            <div>
                <h4>Add a Resource</h4>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input
                            placeholder="Title"
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            placeholder="Author"
                            name='author'
                            value={this.state.author}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            placeholder="Link"
                            name='link'
                            value={this.state.link}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="label" htmlFor='media'>Select Media:</Label>
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
                    </FormGroup>        
                    <Button type='submit'>Add Resource</Button>
                    <Button type='reset' onClick={this.handleCancel}>Cancel</Button>
                </Form>
            </div>
        )
    }
}