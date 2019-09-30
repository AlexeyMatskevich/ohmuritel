import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from '../../utils/apollo'

export default ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)
