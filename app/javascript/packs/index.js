import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import Header from '../components/Header'
import Registration from '../components/Form/Auth/Registration'
import Login from '../components/Form/Auth/Login'
import Provider from '../components/Provider'
import ForgotPassword from '../components/Form/Auth/ForgotPassword'
import RootContext from '../components/Context'
import ResetPassword from '../components/Form/Auth/ResetPassword'
import AddProduct from '../components/Form/AddProduct'
import Home from '../components/Home'

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
      <CssBaseline />
      <RootContext>
        <Header />
        <Switch>
          <Route path='/new_product'>
            <AddProduct />
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
      </RootContext>
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root')
)
