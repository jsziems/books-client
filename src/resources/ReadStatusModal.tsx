
import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isPropertySignature } from 'typescript';
import { Resource } from '../types'


type Props = {
    token: string
    resource: Resource
    fetchResources: () => void
}

interface ReadStatusModalState {
    inModal: boolean
    readStatus: string
}

// interface ResourceState {
//     title: string,
//     author: string,
//     link: string,
//     topic: string,
//     media: string,
//     readStatus: string,
//     summary: string,
//     rating: string
// }

export default class ReadStatusModal extends Component<Props, ReadStatusModalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            inModal: false,
            readStatus: ''
        }
    }

    toggleModal = () => {
        let newModal = !this.state.inModal
        this.setState({ inModal: newModal })
    }

    // handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const target = e.target
    //     const value = target.value
    //     const name = target.name

    //     this.setState( { [name]: value} as unknown as Pick<
    //         ResourceState, keyof ResourceState
    //         >)
    // }

    // handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     fetch(`http://localhost:3000/log${this.props.resource.id}`)
    // }


    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggleModal}>Press Here</Button>
                <Modal isOpen={this.state.inModal} toggle={this.toggleModal} className='status-modal'>
                    {/* <Form onSubmit={this.handleSubmit}> */}
                    <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        {/* <FormGroup>
                        <Label htmlFor='readStatus'>Enter new Status:</Label>
                        <Input 
                            name='readStatus'
                            value={this.state.readStatus}
                            onChange={this.handleChange}
                        />
                        </FormGroup> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        
            
                    </ModalFooter>
                    {/* </Form> */}
                </Modal>
            </div>
        );
    }
}
