'use strict'
import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    networkErrors: [String!]!
  }
`

export const resolvers = {}
