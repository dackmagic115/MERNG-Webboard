import React , { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {   Icon , Label  , Button } from 'semantic-ui-react'

import MyPopUp from '../util/MyPopUp'

const LikeButton = ({ user ,post : {_id , Likes , likeCount}}) => {
    const [ liked , setLiked ] = useState(false)

    useEffect(() =>{
        if(user && Likes.find(like => like.username === user.username)){
            setLiked(true)
        }else setLiked(false)
    })

    const [likePost] = useMutation(LIKE_POST , {
        variables : { postId : _id }
    })

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
               <Icon name='heart' />
            </Button>
        ) : (
            <Button color='teal' basic>
               <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='teal' basic>
            <Icon name='heart' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            <MyPopUp content={liked ? 'Unlike' : 'Like'}>
                {likeButton}
            </MyPopUp>
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>  
    )
}

const LIKE_POST = gql`
    mutation($postId:MongoID){
        LikePost(record:{
        postId:$postId
        
        }){
            body,
        _id,
        createAt,
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
        },
        user
        
        }
    }
`

export default LikeButton
