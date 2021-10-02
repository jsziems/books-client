import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import APIURL from '../helpers/environment'

type Props = {
    token: string
    userToEdit: any
    userUpdateOff: () => void
    fetchUsers: () => void
}

interface UserEditState {
    firstName: string
    lastName: string
    email: string
}

export default class UserEdit extends Component<Props, UserEditState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            firstName: this.props.userToEdit.firstName,
            lastName: this.props.userToEdit.lastName,
            email: this.props.userToEdit.email
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({ [name]: value } as unknown as Pick<
            UserEditState, keyof UserEditState
        >)
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`${APIURL}/user/${this.props.userToEdit.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            }),
        }).then(res => {
            this.props.fetchUsers()
            this.props.userUpdateOff()
        })
    }

    handleCancel = () => {
        this.props.fetchUsers()
        this.props.userUpdateOff()
    }

    render() {
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>Update the User</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor='firstNamee'>First Name:</Label>
                                <Input
                                    name='firstName'
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='lastName'>Last Name:</Label>
                                <Input
                                    name='lastName'
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='email'>Email:</Label>
                                <Input
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button type='submit'>Update</Button>
                            <Button onClick={this.handleCancel}>Cancel</Button>
                        </Form>
                        
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
