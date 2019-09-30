import React from 'react'
import { render } from 'react-dom'
import Provider from '../components/Provider'
import Users from '../components/Ohmuritel'

render(
  <Provider>
    <Users />
  </Provider>,
  document.querySelector('#root')
)
