
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavLink, NavbarToggler, NavItem } from 'reactstrap'

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
                    <NavbarToggler className='mr-2' onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.toggle}>
                                    <Link className='nb-brand' to='/'>
                                        Developer Digest
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.toggle}>
                                    <Link className='nb-link' to='/'>
                                        Home
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='auth'>
                                    <Link className='nb-link' to='/Auth'>
                                        Login
                                    </Link>
                                </NavLink>
                            </NavItem>

                            {this.props.token ? (
                                <>
                                    <NavItem>
                                        <NavLink to='resourceIndex'>
                                            <Link className='nb-link' to='/ResourceIndex'>
                                                Show Resouces
                                            </Link>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to='logout'>
                                            <Link className='nb-link' to='/' onClick={this.props.logout}>
                                                Logout
                                            </Link>
                                        </NavLink>
                                    </NavItem>

                                    {this.props.adminRole === "User Admin" ? (
                                        <>
                                            <NavItem>
                                                <NavLink to='admin'>
                                                    <Link className='nb-link' to='/Admin' >
                                                        Admin
                                                    </Link>
                                                </NavLink>
                                            </NavItem>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                </>
                            ) : (
                                <>
                                
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

