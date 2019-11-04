import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { createCache, createClient } from '../../utils/apollo'

export default ({ children }) => (
  <ApolloProvider client={createClient(createCache())}>
    {children}
  </ApolloProvider>
)
