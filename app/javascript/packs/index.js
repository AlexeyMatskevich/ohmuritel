import React from 'react'
import ReactDOM from 'react-dom'
import Provider from '../components/Provider'
import Users from '../components/Ohmuritel'

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(
  <Provider>
    <Users />
  </Provider>,
  document.querySelector('#root')
)
