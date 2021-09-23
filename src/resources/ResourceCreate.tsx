
import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

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
            media: '',
            readStatus: 'In my queue',
            summary: '',
            rating: '0'
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.info('In ResourceCreate handleChange')
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({ [name]: value } as unknown as Pick<ResourceCreateState,
            keyof ResourceCreateState
        >)
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        console.info('In ResourceCreate handleSubmit ', this.state)
        e.preventDefault()
        fetch('http://localhost:3000/book/create', {
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
                console.info(bookData)
                this.setState({
                    title: '',
                    author: '',
                    link: '',
                    topic: '',
                    media: '',
                    readStatus: 'In my queue',
                    summary: '',
                    rating: '0'
                })
                this.props.fetchResources()
            })
    }

    render() {
        console.info('In ResourceCreate')
        return (
            <>
                <h2>Enter Information about your Resource</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='title'>Title</Label>
                        <Input
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='author'>Author</Label>
                        <Input
                            name='author'
                            value={this.state.author}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='link'>Link</Label>
                        <Input
                            name='link'
                            value={this.state.link}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='topic'>Topic</Label>
                        <Input
                            name='topic'
                            value={this.state.topic}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='media'>Media</Label>
                        <Input
                            name='media'
                            value={this.state.media}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <Button type='submit'>Add Resource</Button>
                </Form>
            </>
        )
    }
}