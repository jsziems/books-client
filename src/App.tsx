import React, { Component } from 'react';
import './App.css';

import Auth from './auth/Auth'
// import { Header } from './common'
import  Sitebar  from './common/Sitebar'
import { SearchBooks } from './search'
import { isConstructorDeclaration } from 'typescript';


// type AppProps = {}
type AppState = { token: string }

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      token: '',
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
    console.info(`In udpateToken, token is ${this.state.token}`)
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '' })
  }

  protectedViews = () => {
    console.info('In protectedViews')
    return (
      <Auth updateToken={this.updateToken}/>
    )

  }

  render() {
    return (
      <div className="App">
        {/* <Header brand="Developer Digest"/> */}

        <Sitebar clickLogout={this.clearToken} token={this.state.token }/>
        {this.protectedViews()}
      </div>
    );
  }
}

export default App;
