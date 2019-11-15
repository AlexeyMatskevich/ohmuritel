import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'
import { resolvers, typeDefs } from './type'
import { networkErrors } from '../components/operations.graphql'
import { CSRF } from './csrf'

const cache = new InMemoryCache()
const isLoggedIn = !!window.localStorage.getItem('refreshToken') || !!window.localStorage.getItem('token')

cache.writeData({
  data: { isLoggedIn, networkErrors: [] }
})

if (process.env.NODE_ENV === 'development') {
  window.secretVariableToStoreCache = cache
}

const getTokens = () => {
  let tokens = { 'X-CSRF-Token': CSRF() }

  const authToken = window.localStorage.getItem('token')
  const authRefreshToken = window.localStorage.getItem('refreshToken')

  tokens = authToken ? { ...tokens, Authorization: authToken } : tokens
  return authRefreshToken ? { ...tokens, RefreshToken: authRefreshToken } : tokens
}

const setTokenForOperation = async operation => {
  return operation.setContext({
    headers: {
      ...getTokens()
    }
  })
}

// link with token
const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle
        Promise.resolve(operation)
          .then(setTokenForOperation)
          .then(() => {
            handle = forward(operation).map(response => {
              const { response: { headers } } = operation.getContext()
              if (headers) {
                const token = headers.get('Authorization')
                const expires = headers.get('Expires')
                const refreshToken = headers.get('RefreshToken')

                if (token) {
                  window.localStorage.setItem('token', token)
                  cache.writeData({
                    data: { isLoggedIn: true }
                  })
                }

                if (expires) {
                  window.localStorage.setItem('expires', expires)
                }

                if (refreshToken) {
                  window.localStorage.setItem('refreshToken', refreshToken)
                }
              }

              if (window.localStorage.getItem('refreshToken')) return response

              const tokenExpiration = window.localStorage.getItem('expires')
              const currentTime = Date.now().valueOf() / 1000

              if (tokenExpiration && currentTime > tokenExpiration) {
                window.localStorage.removeItem('token')
                cache.writeData({
                  data: { isLoggedIn: false }
                })
              }

              return response
            }).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            })
          })
          .catch(observer.error.bind(observer))
        return () => {
          if (handle) handle.unsubscribe()
        }
      })
  )

const logError = error => console.error(error)

const createErrorLink = () =>
  onError(({ graphQLErrors, networkError, operation, response }) => {
    const errorList = cache.readQuery({ query: networkErrors })

    if (graphQLErrors) {
      logError('GraphQL - Error', {
        errors: graphQLErrors,
        operationName: operation.operationName,
        variables: operation.variables
      })

      graphQLErrors.forEach((error) => {
        cache.writeData({
          data: { networkErrors: [...errorList.networkErrors, error.message] }
        })
      })
    }
    if (networkError) {
      logError('GraphQL - NetworkError', networkError)

      cache.writeData({
        data: { networkErrors: [...errorList.networkErrors, 'Network error, please try again'] }
      })
    }
  })

const createHttpLink = () =>
  new HttpLink({
    uri: '/graphql',
    credentials: 'include'
  })

export const createClient = () => {
  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      createErrorLink(),
      createLinkWithToken(),
      createHttpLink()
    ]),
    typeDefs,
    resolvers
  })
}
