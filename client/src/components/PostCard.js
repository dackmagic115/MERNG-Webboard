import React , {useContext} from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import MyPopUp from '../util/MyPopUp'


import { Card , Icon , Label , Image , Button } from 'semantic-ui-react'

const PostCard = ({post : {body , createAt , _id , username , Likes , comments}}) => {

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
                <Card.Meta as={Link} to = {`/posts/${_id}`}>{moment(createAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{_id , Likes , likeCount : Likes.length }}/>  
                <MyPopUp content="จำนวนคอมเม้น">
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic onClick={commentOnPosts}>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {comments.length}
                    </Label>
                </Button>   
                </MyPopUp>  
                {user && user.username === username && 
                   <DeleteButton postId={_id} />
                }
         </Card.Content>
        </Card>
    )
}

export default PostCard
