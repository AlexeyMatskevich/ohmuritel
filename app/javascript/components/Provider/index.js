import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { createClient } from '../../utils/apollo'

export default ({ children }) => (
  <ApolloProvider client={createClient()}>
    {children}
  </ApolloProvider>
)
