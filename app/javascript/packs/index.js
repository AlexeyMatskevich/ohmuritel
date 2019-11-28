'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from '../components/Header'
import Registration from '../components/Form/Auth/Registration'
import Login from '../components/Form/Auth/Login'
import Provider from '../components/Provider'
import { ApolloNetworkStatusProvider } from 'react-apollo-network-status'
import ForgotPassword from '../components/Form/Auth/ForgotPassword'
import ResetPassword from '../components/Form/Auth/ResetPassword'
import AddProduct from '../components/Form/Product/AddProduct'
import Home from '../components/Home'
import Product from '../components/Product'
import NetworkError from '../components/NetworkError'
import SearchList from '../components/ShopList/SearchList'

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

function Order () {
  return <h1>Order</h1>
}

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <ApolloNetworkStatusProvider>
        <CssBaseline />
        <Header />
        <NetworkError />
        <Switch>
          <Route path='/product/:id'>
            <Product />
          </Route>
          <Route path='/new_product'>
            <AddProduct />
          </Route>
          <Route path='/search'>
            <SearchList />
          </Route>
          <Route path='/new-password/:resetPasswordToken/:email'>
            <ResetPassword />
          </Route>
          <Route path='/forgot_password'>
            <ForgotPassword />
          </Route>
          <Route path='/registration'>
            <Registration />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/order'>
            <Order />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </ApolloNetworkStatusProvider>
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root')
)
