import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from './auth/Auth'
import Sitebar from './common/Sitebar'
import Home from './common/Home'
import ResourceIndex from './resources/ResourceIndex'
import UserIndex from './userAdmin/UserIndex'

type AppState = { 
  token: string,
  adminRole: string
 }

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      token: localStorage.getItem("token") || "",
      adminRole: localStorage.getItem("adminRole") || "None"
    }
  }

  updateRole = (newRole: string) => {
    localStorage.setItem('adminRole', newRole)
    this.setState({ adminRole: newRole })
    console.info(`In udpateRole, adminRole is ${this.state.adminRole}`)
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
    console.info(`In udpateToken, token is ${this.state.token}`)
  }

  clearStorage = () => {
    localStorage.clear()
    this.setState({ token: '' })

    localStorage.clear() 
    this.setState({ adminRole: '' })
  }

  urlPatterns = () => {
    return (
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/auth'>
          <Auth updateToken={this.updateToken} updateRole={this.updateRole}/>
        </Route>
        <Route exact path='/resourceIndex'>
          <ResourceIndex token={this.state.token} />
        </Route>
        <Route exact path='/admin'>
          <UserIndex token={this.state.token} />
        </Route>
      </Switch>
    )
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Sitebar logout={this.clearStorage} token={this.state.token} adminRole={this.state.adminRole} />
          {this.urlPatterns()}
        </Router>
      </div>
    );
  }
}


            
export default App;
