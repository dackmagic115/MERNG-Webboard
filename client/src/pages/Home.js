import React , {useContext} from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Grid } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'

import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POSTS } from '../util/graphql'

const Home = () => {

    const { user } = useContext(AuthContext)

    const { loading , data  } = useQuery(FETCH_POSTS)


    return (
        <Grid columns={3} divided>
            <Grid.Row className="page-title">
              <h1>โพสต์</h1>
            </Grid.Row>
            <Grid.Row>
                {user &&(
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading Posts...</h1>
                ):(
                    data && data.postMany.map(post =>(
                        <Grid.Column key={post._id} style={{marginBottom :20}}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>

    )
}



export default Home
