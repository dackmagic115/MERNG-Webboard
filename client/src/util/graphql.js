import gql from 'graphql-tag'

export const FETCH_POSTS = gql`
        query{
        postMany {
            body
            username
            createAt
            user
            comments {
            body
            username
            createAt
            _id
            },
            Likes {
            username
            createAt
            _id
            }
            _id
        }
        }
`