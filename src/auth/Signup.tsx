import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

type SignupProps = {
    updateToken: (newToken: string) => void
}
type SignupState = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export default class Signup extends Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // QUESTION: How does React.ChangeEvent work?
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.info('In Signup:  handleChange')
        const target = event.target;
        const value = target.value
        const name = target.name
        // QUESTION:  How does this work?
        this.setState({ [name]: value } as unknown as
            Pick<SignupState, keyof SignupState>)

        console.info(`In Signup handleChange, this.state is ${this.state}`)
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        console.info('In Signup: handleSubmit')
        event.preventDefault()
        fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then(res => res.json())
            .then(data => {
                this.props.updateToken(data.sessionToken)
                console.info(`In Signup handleSubmit, data is ${data.sessionToken}`)
            })
            .catch(err => {
                console.error(err)
                console.info(err)
            })
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                {/* MIN LENGTH NOT WORKING */}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='email'>Email Address</Label>
                        <Input
                            onChange={this.handleChange}
                            name='email'
                            value={this.state.email}
                            required pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
                            title='Please enter a valid email address'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            onChange={this.handleChange}
                            name='password'
                            value={this.state.password}
                            type='text'
                            minLength={5}
                            required pattern='^(?=.{5,20})(?=.*[a-z])(?=.*[A-Z]).*$'
                            title='Password must be at least 5 characters, contain one upper case letter, one lower case letter, and a number.'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Input
                            onChange={this.handleChange}
                            name='firstName'
                            value={this.state.firstName}
                            type='text'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Input
                            onChange={this.handleChange}
                            name='lastName'
                            value={this.state.lastName}
                            type='text'
                        />
                    </FormGroup>
                    <Button type='submit'>Sign Up</Button>
                </Form>
            </div>
        )
    }
}