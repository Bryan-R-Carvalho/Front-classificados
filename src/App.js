import React, { Component } from 'react';
import Categoria from './pages/categoria/Categoria';
import Produto  from './pages/produto/Produto';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
  render() {
    return(
      <BrowserRouter>
      <div className="container-fluid d-grid">

        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/categorias">
            <Categoria/>
          </Route>
          <Route path="/produtos">
            <Produto/>
          </Route>
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}