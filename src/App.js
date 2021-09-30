import React, { Component } from 'react';
import Categoria from './categoria/Categoria';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
  render() {
    return(
      <BrowserRouter>
      <div className="container-fluid">

        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/categorias">
            <Categoria/>
          </Route>
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}