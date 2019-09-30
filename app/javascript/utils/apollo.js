import ApolloClient from 'apollo-boost'

// getToken from meta tags
const getToken = () => document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const token = getToken()

export const client = new ApolloClient({
  headers: { 'X-CSRF-Token': token }
})
