import React, { Component } from 'react';
import './App.css';

import Auth from './auth/Auth'
import { Header } from './common'
import { Navbar } from './common'
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

  // QUESTION: Why do we use localStorage as well as the state variable token?
  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
    console.info(`In udpateToken, token is ${this.state.token}`)
  }

  protectedViews = () => {
    console.info('In protectedViews')
    return (
      // QUESTION - how does this work?
      <Auth updateToken={this.updateToken}/>
    )

  }

  render() {
    return (
      <div className="App">
        <Header brand="Developer Digest"/>

        <Navbar />
        {this.protectedViews()}
      </div>
    );
  }
}

export default App;
