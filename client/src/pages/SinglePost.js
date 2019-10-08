import React , {useContext , useState , useRef} from 'react'
import gql from 'graphql-tag'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/react-hooks'

import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import MyPopUp from '../util/MyPopUp'
import { Grid , Image, Card, Button, Icon, Label, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'


const SinglePost = (props) => {
    const { match : { params: { postId } }} = props
    const { user } = useContext(AuthContext)
    const commentInputRef = useRef(null)

    const [comment , setComment] = useState('')

    const { loading , data  } = useQuery(FETCH_POST , {
        variables:{
            postId : postId
        }
    })

    const [commentPost] = useMutation(COMMENT_POST,{
        update(){
            setComment('')
            commentInputRef.current.blur()
        },
        variables:{
            postId,
            body: comment
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
                                 <MyPopUp content="จำนวนคอมเม้น">
                                    <Button as='div' labelPosition='right'>
                                        <Button color='blue' basic onClick={console.log('commnet')}>
                                            <Icon name='comments' />
                                        </Button>
                                        <Label basic color='blue' pointing='left'>
                                            {comments.length}
                                        </Label>
                                    </Button>   
                                    </MyPopUp>  
                                {user && user.username === username && (
                                    <DeleteButton postId = {_id } callback={deleteButtonCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                <p>กล่องแสดงความคิดเห็น</p>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment.."
                                            name="comment"
                                            value={comment}
                                            onChange={event => setComment(event.target.value) }
                                            ref={commentInputRef}
                                        />
                                        <button
                                            type="submit"
                                            className="ui button teal"
                                            disabled={comment.trim===''}
                                            onClick={commentPost}
                                        >
                                        ส่ง
                                        </button>

                                    </div>
                                </Form>
                                </Card.Content>
                            </Card>
                        )}
                        { comments.map((comment) => (
                            <Card fluid key={comment._id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={_id} commentId = {comment._id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        )) }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )

    }



    return postMarkup
}

const COMMENT_POST = gql`
    mutation($postId:MongoID , $body:String){
        CommentPost(record:{
            postId:$postId
            body:$body
            
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
