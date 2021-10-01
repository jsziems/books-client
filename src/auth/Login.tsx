import React, { Component } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import APIURL from '../helpers/environment'

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
        const target = event.target;
        const value = target.value
        const name = target.name
        this.setState({ [name]: value } as unknown as
            Pick<LoginState, keyof LoginState>)

    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        // fetch('http://localhost:3000/user/login', {
            fetch(`${APIURL}/user/login`, {
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
        })
        .catch(err => {
            console.error(err)
            console.info(err)
        })
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='email'></Label>
                        <Input
                        style={{backgroundColor: '#DDDFE2'}}
                        placeholder="Email Address"
                        onChange={this.handleChange}
                        name='email'
                        value={this.state.email}
                        required
                        type='text'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'></Label>
                        <Input
                        style={{backgroundColor: '#DDDFE2'}}
                        placeholder="Password"
                        onChange={this.handleChange}
                        name='password'
                        value={this.state.password}
                        required
                        type='text'
                        />
                    </FormGroup>
                    <button type='submit'>Login</button>
                </Form>

                { this.state.successfulLogin ?
                <>
                      <Redirect push to='/ResourceIndex'/>
                </>
                : <></>}
            </div>
        )
    }
}