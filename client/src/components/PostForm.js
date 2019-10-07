import React , {useState} from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { Form  , Button } from 'semantic-ui-react'

import { FETCH_POSTS } from '../util/graphql'

const PostForm = () => {

    const [body , setBody] = useState('')

    const [createPost , { error } ] = useMutation(POST_CREATE,{
        variables:{
            body : body
        },
        update(proxy,result){
           const data =   proxy.readQuery({
                query : FETCH_POSTS
            })
            data.postMany = [result.data.PostCreate , ...data.postMany]
            data.postMany.push(result.data.PostCreate)
            proxy.writeQuery({query:FETCH_POSTS , data })
            
            setBody('')
        }
    })

    const onChange = (e) => {
        setBody(e.target.value)
    }

    const onSubmit = () =>{
        createPost()
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>โพสต์ข้อความ</h2>
            <Form.Field>
                <Form.Input
                    placeholder = "ใส่ข้อความ"
                    name = "body"
                    onChange = {onChange}
                    value = {body}
                />
                <Button type="submit" color="teal">
                    โพสต์
                </Button>
            </Form.Field>
        </Form>
    )
}

const POST_CREATE  = gql`
    mutation($body : String){
        PostCreate(record:{
            body:$body
        }){
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

export default PostForm
