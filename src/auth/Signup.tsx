import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Redirect } from 'react-router-dom'

type SignupProps = {
    updateToken: (newToken: string) => void
    updateRole: (newRole: string) => void
}
type SignupState = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    adminRole: string,
    successfulLogin: boolean
}

export default class Signup extends Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            adminRole: 'None',
            successfulLogin: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const target = event.target;
        const value = target.value
        const name = target.name
        this.setState({ [name]: value } as unknown as
            Pick<SignupState, keyof SignupState>)

        console.info(`In Signup:  handleChange value is ${value} for ${name}`)
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
                lastName: this.state.lastName,
                adminRole: this.state.adminRole
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then(res => res.json())
            .then(data => {
                this.props.updateToken(data.sessionToken)
                this.props.updateRole(this.state.adminRole)
                this.setState({ successfulLogin: true })
                console.info(`In Signup handleSubmit, token is ${data.sessionToken} and admin role is ${this.state.adminRole}`)
            })
            .catch(err => {
                console.error(err)
                console.info(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                {/* ToDo MIN LENGTH NOT WORKING */}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='email'></Label>
                        <Input
                            style={{ backgroundColor: '#DDDFE2' }}
                            placeholder="Email Address"
                            onChange={this.handleChange}
                            name='email'
                            value={this.state.email}
                            required pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
                            title='Please enter a valid email address'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'></Label>
                        <Input
                            style={{ backgroundColor: '#DDDFE2' }}
                            placeholder="Password"
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
                        <Label style={{ color: "darkgray", display: 'flex' }} htmlFor='adminRole'>Select Role:</Label>
                        <Input
                            type='select'
                            name='adminRole'
                            value={this.state.adminRole}
                            onChange={this.handleChange}
                            style={{ backgroundColor: '#DDDFE2' }}
                        >
                            <option value="None">None</option>
                            <option value="User Admin">Admin</option>
                            
                            
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='firstName'></Label>
                        <Input
                            style={{ backgroundColor: '#DDDFE2' }}
                            placeholder="First Name"
                            onChange={this.handleChange}
                            name='firstName'
                            value={this.state.firstName}
                            type='text'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='lastName'></Label>
                        <Input
                            style={{ backgroundColor: '#DDDFE2' }}
                            placeholder="Last Name"
                            onChange={this.handleChange}
                            name='lastName'
                            value={this.state.lastName}
                            type='text'
                        />
                    </FormGroup>
                    
                    <button type='submit'>Sign Up</button>
                </Form>
                {this.state.successfulLogin ?
                    <>
                        <Redirect push to='/ResourceIndex' />
                        {/* <Redirect push to='/' /> */}
                    </>
                    : <></>}
            </div>
        )
    }
}