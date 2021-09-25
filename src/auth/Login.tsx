import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { Redirect } from 'react-router-dom'

type LoginProps = {
    updateToken: (newToken: string) => void
    updateRole: (newRole: string) => void
}

type LoginState = {
    email: string,
    password: string,
    successfulLogin: boolean,
    adminRole: string
}

export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            successfulLogin: false,
            adminRole: "None"
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.info('In Login:  handleChange')
        const target = event.target;
        const value = target.value
        const name = target.name
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
            this.props.updateRole(data.adminRole)
            this.setState({ successfulLogin: true })
            console.info(`In Login handleSubmit, token is ${data.sessionToken} admin role is ${data.adminRole}`)
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

                { this.state.successfulLogin ?
                <>
                    <Redirect push to='/'/>
                </>
                : <></>}
            </div>
        )
    }
}