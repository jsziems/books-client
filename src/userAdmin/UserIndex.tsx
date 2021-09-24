import React, { Component } from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap'

import { User } from '../types'
import UserEdit from './UserEdit'
import UserTable from './UserTable'


type UserIndexProps = {
    token: string
}

type UserIndexState = {
    userList: User[],
    userUpdateActive: boolean,
    userToEdit: object
}

export default class Admin extends Component<UserIndexProps, UserIndexState> {
    constructor(props: UserIndexProps) {
        super(props)
        this.state = {
            userList: [],
            userUpdateActive: false,
            userToEdit: {}
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

    editThisUser = (user: User) : void => {
        this.setState({ userToEdit:  user })
        console.info(user)
    }

    userUpdateOn = () => {
        this.setState({ userUpdateActive: true })
    }

    userUpdateOff = () => {
        this.setState({ userUpdateActive: false })
    }

    componentDidMount = () => {
        this.fetchUsers()
    }

    render() {
        console.info('In UserIndex')
        return (

               <Container>
                <Row>
                    <Col md='9'>
                        <div>
                            <UserTable
                                userList={this.state.userList}
                                editThisUser={this.editThisUser}
                                token={this.props.token}
                                userUpdateOn={this.userUpdateOn}
                                fetchUsers={this.fetchUsers}
                            />
                        </div>
                    </Col>
                    {this.state.userUpdateActive && this.state.userToEdit
                        ? (<UserEdit
                            token={this.props.token}
                            userToEdit={this.state.userToEdit}
                            userUpdateOff={this.userUpdateOff}
                            fetchUsers={this.fetchUsers}
                        />
                        )
                        : (<> </>)}
                </Row>

            </Container>
        ) 

    }
}