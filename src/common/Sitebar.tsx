
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavLink, NavbarToggler, NavItem } from 'reactstrap'

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
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Developer Digest</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.toggle}>
                                    <Link to='/'>
                                        Home
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='auth'>
                                    <Link to='/Auth'>
                                        Login
                                    </Link>
                                </NavLink>
                            </NavItem>

                            {this.props.token ? (
                                <>
                                    <NavItem>
                                        <NavLink to='resourceIndex'>
                                            <Link to='/ResourceIndex'>
                                                Show Resouces
                                            </Link>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to='logout'>
                                            <Link to='/' onClick={this.props.logout}>
                                                Logout
                                            </Link>
                                        </NavLink>
                                    </NavItem>
                                    {/* ToDo: Add logic:  if Admin, then show this menu option */}
                                    {/* <NavItem>
                                        <NavLink to='admin'>
                                            <Link to='/Admin' >
                                                Admin
                                            </Link>
                                        </NavLink>
                                    </NavItem> */}

                                </>
                            ) : (
                                <></>
                            )}

                            {this.props.adminRole === "User Admin" ? (
                                <>
                                <NavItem>
                                        <NavLink to='admin'>
                                            <Link to='/Admin' >
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

