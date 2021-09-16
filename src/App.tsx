import React from 'react';
import './App.css';

import Auth from './auth/Auth'
import { Header } from './common'
import { Navbar } from './common'
import { SearchBooks } from './search'


type AppProps = {}
type AppState = {}

class App extends React.Component {

  protectedViews = () => {
    console.info('In protectedViews')
    return (
      <Auth />
    )


  }

  render() {
    return (
      <div className="App">
        <Header brand="Developer Digest Today" />

        <Navbar />
        {this.protectedViews()}
      </div>
    );
  }
}

export default App;
