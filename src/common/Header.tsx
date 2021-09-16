import { CardHeaderProps } from '@material-ui/core'
import React from 'react'

type HeaderProps = {
    brand: string
}

export class Header extends React.Component <HeaderProps, {}>{
    render() {
        const { brand } = this.props
        return (
            <nav>
                <h1>{ brand }</h1>
            </nav>
        )
    }

}