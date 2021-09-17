import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

type LoginProps = {
    updateToken: (newToken: string) => void
}

type LoginState = {
    email: string,
    password: string
}

export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    // QUESTION: How does React.ChangeEvent work?
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.info('In Login:  handleChange')
        const target = event.target;
        const value = target.value
        const name = target.name
        // QUESTION:  How does this work?
        this.setState({ [name]: value } as unknown as
            Pick<LoginState, keyof LoginState>)

        console.info(`In Login handleChange, this.state is ${this.state}`)
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        console.info('In Login: handleSubmit')
        event.preventDefault()
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
        .then(res => res.json())
        .then(data => {
            this.props.updateToken(data.sessionToken)
            console.info(`In Login handleSubmit, data is ${data.sessionToken}`)
        })
        .catch(err => {
            console.error(err)
            console.info(err)
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='email'>Email Address</Label>
                        <Input
                        onChange={this.handleChange}
                        name='email'
                        value={this.state.email}
                        required
                        type='text'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                        onChange={this.handleChange}
                        name='password'
                        value={this.state.password}
                        required
                        type='text'
                        />
                    </FormGroup>
                    <Button type='submit'>Login</Button>
                </Form>
            </div>
        )
    }
}