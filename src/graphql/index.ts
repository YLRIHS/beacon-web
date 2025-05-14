import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { setContext } from '@apollo/client/link/context'

// HTTP connection to the API

const BASE_URL = import.meta.env.VITE_API_BEACON_SERVICE
const httpLink = createHttpLink({
  uri: `${BASE_URL}/protected/graphql`,
})

 
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
})

 
const cache = new InMemoryCache()
 
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

// Function to provide Apollo Client to Vue app
export function provideApollo() {
  provide(DefaultApolloClient, apolloClient)
}