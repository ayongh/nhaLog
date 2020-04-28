import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import MainLog from './Component/MainLog'
import logDetail from './Component/logDetail'

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainLog}/>
          <Route exact path="/logDetail" component={logDetail}/>

        </Switch>
      </BrowserRouter>
    );

  }
}

export default App;
