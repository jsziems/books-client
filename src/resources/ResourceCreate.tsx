
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
        console.log(value)
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
                    readStatus: 'Not started',
                    summary: '',
                    rating: '0'
                })
                this.props.fetchResources()
            })
    }

    handleCancel = () => {
        this.props.fetchResources()
    }

    render() {
        console.info('In ResourceCreate')
        return (
            <div className='create-resource'>
                <h4>Add a Resource</h4>
                {/* ToDo: Border isn't working.  Also need additional styling  */}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input
                            className="input"
                            placeholder="Title"
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            className="input"
                            placeholder="Author"
                            name='author'
                            value={this.state.author}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            className="input"
                            placeholder="Link"
                            name='link'
                            value={this.state.link}
                            onChange={this.handleChange}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="label" htmlFor='media'>Select Media:</Label>
                        {/* ToDo: drop down arrow not showing. */}
                        {/* ToDo: Move label? */}
                        {/* ToDo: not saving data */}
                        <Input
                            className="input"
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