
import React, { Component } from 'react'
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'

type Props = {
    clickLogout: () => void,
    token: string
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
                        {/* <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem> */}
                        <NavItem>
                            <Button>Search</Button>
                        </NavItem>
                        <NavItem>
                            <Button>Add One</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={this.props.clickLogout}>Logout</Button>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
