import React from 'react'
import ReactDOM from 'react-dom'
import Provider from '../components/Provider'
import Users from '../components/Ohmuritel'
import RegistrationForm from '../components/RegistrationForm'

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(
  <Provider>
    <Users />
    <RegistrationForm />
  </Provider>,
  document.querySelector('#root')
)
