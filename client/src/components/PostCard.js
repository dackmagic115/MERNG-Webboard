import React , {useContext} from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from '../components/LikeButton'

import { Card , Icon , Label , Image , Button } from 'semantic-ui-react'

const PostCard = ({post : {body , createdAt , _id , username , Likes , comments}}) => {

    const { user } = useContext(AuthContext)

    const likePost = () =>{
        console.log('Likes !!!')
    }

    const commentOnPosts = () =>{
        console.log('Commnets !!!')
    }

    return (
        <Card>
        <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to = {`/posts/${_id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{_id , Likes , likeCount : Likes.length }}/>  
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic onClick={commentOnPosts}>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {comments.length}
                    </Label>
                </Button>     
                {user && user.username === username && (
                    <Button 
                        as="div"
                        color="red"
                        floated="right"
                        onClick={() => console.log('Delete Post')}
                    >
                        <Icon name="trash" style={{margin:0}}/>
                    </Button>
                )}
         </Card.Content>
        </Card>
    )
}

export default PostCard
