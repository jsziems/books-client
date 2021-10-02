import React, { Component } from 'react'
import { Alert, Button, Table } from 'reactstrap'
import APIURL from '../helpers/environment'
import { User } from '../types'

type Props = {
    userList: User[]
    editThisUser: (user: User) => void
    token: string
    userUpdateOn: () => void
    fetchUsers: () => void
}

export default class UserTable extends Component<Props, {}> {

    deleteUser = (user: User) => {
        fetch(`${APIURL}/user/${user.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            })
        })
            .then(() => {
                <Alert>Successfully deleted user and their associated resources.</Alert>
                this.props.fetchUsers()
            }
            )
    }

    render() {
        return (
            <>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email Address</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.userList?.map((oneUser: User, userIndex: number) => {
                            return (
                                <tr key={userIndex}>
                                    <th scope="row">{oneUser.id}</th>
                                    <td>{oneUser.email}</td>
                                    <td>{oneUser.firstName}</td>
                                    <td>{oneUser.lastName}</td>
                                    <td>{oneUser.adminRole}</td>
                                    <td>{oneUser.updatedAt}</td>
                                    <td>
                                        <Button onClick={() => {
                                            this.deleteUser(oneUser)
                                        }}
                                        >Delete
                                        </Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => {
                                            this.props.editThisUser(oneUser)
                                            this.props.userUpdateOn()
                                        }}
                                        >Update
                                        </Button>
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