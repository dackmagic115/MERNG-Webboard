import React from 'react'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider  } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'


import App from '../App'

const httpLike = createHttpLink({
    uri: 'http://localhost:4602/graphql'
})

const authLink = setContext(() =>{
    const token = localStorage.getItem("jwtToken")

    return{
        headers:{
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLike),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)