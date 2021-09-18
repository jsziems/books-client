import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { setSyntheticLeadingComments } from 'typescript'

type Props = {
    fetchResources: () => void
    token: string
}

export interface ResourceCreateState {
    title: string
}

export default class ResourceCreate extends Component<Props, ResourceCreateState>{
    constructor(props: Props) {
        super(props)
        this.state = {
            title: '',
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

    // START HERE -- IT ISN"T GETTING TO HANDLESUBMIT 
    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        console.info ('In ResourceCreate handleSubmit')
        e.preventDefault()
        fetch('http://localhost:3000/book/', {
            method: 'POST',
            body: JSON.stringify({ title: this.state.title }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,

            }),
        })
            .then(res => res.json())
            .then(bookData => {
                console.log(bookData)
                this.setState({
                    title: '',
                })
                this.props.fetchResources()
            })
    }

    render() {
        console.info ('In ResourceCreate')
        return (
            <>
                <h2>Enter Information about your Resource</h2>
                <Form onSubmit={this.handleSubmit} />
                <FormGroup>
                    <Label htmlFor='title'>Title</Label>
                    <Input
                        name='title'
                        value={this.state.title}
                        onChange={this.handleChange}
                    >
                    </Input>
                </FormGroup>
                <Button type='submit'>Add Resource</Button>
            </>
        )
    }
}