import React , {useState} from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { Button , Confirm , Icon } from 'semantic-ui-react'

import { FETCH_POSTS } from '../util/graphql'

import MyPopUp from '../util/MyPopUp'

const DeleteButton = ({postId , commentId , callback}) => {

    const [confirmOpen , setConfirmOpen] = useState(false)

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST

    const [ deletePostOrMutation ] = useMutation(mutation , {
        
        update(proxy){
            setConfirmOpen(false)
            if(!commentId){
                const data = proxy.readQuery({
                    query: FETCH_POSTS
                })
            
                data.postMany = data.postMany.filter(p => p.id !== postId)
                proxy.writeQuery({query : FETCH_POSTS , data})
            }
            if(callback) callback()
        },
        variables:{
            postId,
            commentId
        },
        refetchQueries:[{query : FETCH_POSTS}]

    })
    return (
        <>
                 <MyPopUp content={commentId ? 'Deleted comment' : 'Delete post' } >
                    <Button 
                            as="div"
                            color="red"
                            floated="right"
                            onClick={() => setConfirmOpen(true)}
                        >
                            <Icon name="trash" style={{margin:0}}/>
                    </Button>
                 </MyPopUp>
                    <Confirm
                        open={confirmOpen}
                        onCancel={() => setConfirmOpen(false)}
                        onConfirm={deletePostOrMutation}
                    />
        </>
    )
}

const DELETE_POST = gql`
    mutation($postId:MongoID){
        PostDelete(record:{
            postId:$postId
        }){
            Message
        }
        }
`

const DELETE_COMMENT = gql`
    mutation($postId : MongoID , $commentId : MongoID){
        CommentDelete(
            record:{
            postId:$postId
            commentId:$commentId
            }
        ){
            _id,
            comments {
            body
            username
            createAt
            _id
            }
        }
        }
`

export default DeleteButton
