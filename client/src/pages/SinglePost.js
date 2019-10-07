import React , {useContext , useEffect} from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'

import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import { Grid , Image, Card, Button, Icon, Label } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'


const SinglePost = (props) => {
    const { match : { params: { postId } }} = props

    const { user } = useContext(AuthContext)

    const { loading , data , error } = useQuery(FETCH_POST , {
        variables:{
            postId : postId
        }
    })

    const deleteButtonCallback = () =>{
        props.history.push('/')
    }
    
    let postMarkup
    if(loading){
        postMarkup = <p>Loading post...</p>
    } else{

        const { _id , body , createAt , username , comments , Likes  } = data.postById

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2} >
                        <Image 
                                floated='right'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                         />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                 <LikeButton user={user} post={{_id , Likes , likeCount : Likes.length }}/>  
                                 <Button as="div" labelPosition="right" onClick={() => console.log('comment on post')}>
                                    <Button basic color="blue">
                                        <Icon name="comments"/>
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                     {comments.length}
                                    </Label>
                                 </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId = {_id } callback={deleteButtonCallback} />
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )

    }



    return postMarkup
}

const FETCH_POST = gql`
        query($postId:MongoID!){
        postById(_id:$postId){
                body
            username
            createAt
            comments {
            body
            username
            createAt
            _id
            }
            Likes {
            username
            createAt
            _id
            }
            user
            _id
        }
        }
`



export default SinglePost
