import React, { Component } from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap'

import { User } from '../types'

type AdminProps = {
    token: string
}

type AdminState = {
    userList: User[]
}

export default class Admin extends Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props)
        this.state = {
            userList: []
        }
    }

    fetchUsers = () => {
        console.info('In fetchUsers')
        fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            }),
        })
            .then((res) => res.json())
            .then((userData) => {
                this.setState({ userList: userData })
                console.info(this.state.userList)
            })
            .catch((err) => {
                console.info(err)
            })
    }

    deleteUser = (user: User) => {
        fetch(`http://localhost:3000/user/${user.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            })
        })
        .then(() => this.fetchUsers())
    }

    componentDidMount = () => {
        this.fetchUsers()
    }

    render() {
        console.info('In Admin')
        return (
            <>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email Address</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList?.map((oneUser: User, userIndex: number) => {
                            return (
                                <tr key={userIndex}>
                                    <th scope="row">{oneUser.id}</th>
                                    <td>{oneUser.email}</td>
                                    <td>{oneUser.firstName}</td>
                                    <td>{oneUser.lastName}</td>
                                    <td>{oneUser.createdAt}</td>
                                    <td>
                                    <Button onClick={() => {
                                            this.deleteUser(oneUser)
                                        }}
                                        >Delete
                                        </Button>
                                    </td>
                                    <td>
                                    <Input placeholder="Enter new password" onChange={this.resetPassword} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table> 
            </>
        )
    }
}