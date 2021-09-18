import { CardHeaderProps } from '@material-ui/core'
import { render } from '@testing-library/react'
import React, { Component } from 'react'
import { Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { isPropertySignature } from 'typescript'

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

    render() {
        return (
            <>
                <Navbar>
                    {/* <NavbarBrand href="/">WorkoutLog</NavbarBrand> */}
                    {/* <NavbarToggler onClick={toggle} /> */}
                    {/* <Collapse isOpen={isOpen} navbar> */}
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <Button onClick={this.props.clickLogout}>Logout</Button>
                        </NavItem>
                    </Nav>
                    {/* </Collapse> */}
                </Navbar>
            </>
        )
    }
}
