
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarBrand, NavLink, NavbarToggler, NavItem } from 'reactstrap'

type Props = {
    logout: () => void,
    token: string,
    adminRole: string
}

interface SitebarState {
    isOpen: boolean
}

export default class Sitebar extends Component<Props, SitebarState>{
    constructor(props: Props) {
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => {
        let newIsOpen = !this.state.isOpen
        this.setState({ isOpen: newIsOpen })
    }

    render() {
        return (
            <div>
                <Navbar className="fixed-top navbar-expand-md" dark expand="lg">
                    <NavbarBrand style={{ color: "white" }} href="/">Developer Digest</NavbarBrand>
                    <NavbarToggler className='mr-2' onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.toggle}>
                                    <Link style={{ color: "white" }} to='/'>
                                        Home
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='auth'>
                                    <Link style={{ color: "white" }} to='/Auth'>
                                        Login
                                    </Link>
                                </NavLink>
                            </NavItem>

                            {this.props.token ? (
                                <>
                                    <NavItem>
                                        <NavLink to='resourceIndex'>
                                            <Link style={{ color: "white" }} to='/ResourceIndex'>
                                                Show Resouces
                                            </Link>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to='logout'>
                                            <Link style={{ color: "white" }} to='/' onClick={this.props.logout}>
                                                Logout
                                            </Link>
                                        </NavLink>
                                    </NavItem>
                                </>
                            ) : (
                                <></>
                            )}

                            {this.props.adminRole === "User Admin" ? (
                                <>
                                    <NavItem>
                                        <NavLink to='admin'>
                                            <Link style={{ color: "white" }} to='/Admin' >
                                                Admin
                                            </Link>
                                        </NavLink>
                                    </NavItem>
                                </>
                            ) : (
                                <></>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

