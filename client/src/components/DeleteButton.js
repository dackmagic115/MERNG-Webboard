import React , {useState} from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { Button , Confirm , Icon } from 'semantic-ui-react'

import { FETCH_POSTS } from '../util/graphql'

const DeleteButton = ({postId , callback}) => {

    const [confirmOpen , setConfirmOpen] = useState(false)

    const [ deletePost ] = useMutation(DELETE_POST , {
        update(proxy){
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: FETCH_POSTS
            })
            data.postMany = data.postMany.filter(p => p.id !== postId)
            proxy.writeQuery({query : FETCH_POSTS , data})
            if(callback) callback()
        },
        variables:{
            postId
        },
        refetchQueries:[{query : FETCH_POSTS}]

    })
    return (
        <>
                    <Button 
                        as="div"
                        color="red"
                        floated="right"
                        onClick={() => setConfirmOpen(true)}
                    >
                        <Icon name="trash" style={{margin:0}}/>
                    </Button>
                    <Confirm
                        open={confirmOpen}
                        onCancel={() => setConfirmOpen(false)}
                        onConfirm={deletePost}
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

export default DeleteButton
