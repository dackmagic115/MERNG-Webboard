import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { Card , Icon , Label , Image , Button } from 'semantic-ui-react'

const PostCard = ({post : {body , createdAt , _id , username , Likes , comments}}) => {

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
                <Button as='div' labelPosition='right'>
                    <Button color='teal' basic onClick={likePost}>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {Likes.length}
                    </Label>
                </Button>      
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic onClick={commentOnPosts}>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {comments.length}
                    </Label>
                </Button>     
         </Card.Content>
        </Card>
    )
}

export default PostCard
