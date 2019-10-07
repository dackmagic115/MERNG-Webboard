import React , { useContext , useState} from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'

import { Form, Button } from 'semantic-ui-react'

const Login = (props) => {
    const context = useContext(AuthContext)
    const [ errors , setErrors ] = useState({})
    const [formData, setFormData] = useState({
        username : '',
        password : '',
  
    })

    const { username , password } = formData

    const onChange = (e) =>{
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const [Login , { loading }] = useMutation(LOGIN_USER,{
        update( _ , result){
            console.log(result)
            context.login(result.data.Login)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].data)
        },
        variables:{
            "username": username,
            "password": password,
         
          }
    })

    const onSubmit = (e) =>{
        e.preventDefault()
        Login()

    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
                <h1>สมัครสมาชิก</h1>
                <Form.Input 
                    label = "Username"
                    placeholder = "username..."
                    type = "text"
                    name  = "username"
                    value = {username}
                    onChange = {onChange}
                    />
                <Form.Input 
                    label = "Password"
                    placeholder = "password..."
                    type = "password"
                    name  = "password"
                    value = {password}
                    onChange = {onChange}
                />
                  
                <Button type="submit" primary>
                       เข้าสู่ระบบ
                </Button>

            </Form>
            {/* {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
                </div>
            )} */}

            {
                errors.length > 0 &&(
                    <div className="ui error message">
                    <ul className="list">
                        {errors.map(value => (
                            <li key={value.message}>{value.message}</li>
                        ))}
                    </ul>
                    </div>
                )
            }
        </div>
    )
}


const LOGIN_USER = gql`
   mutation($username : String , $password:String){
        Login(record:{
            username:$username,
            password:$password,
        }){
            email,
            token,
            id,
            username,
            createAt
        }
    }`
        

export default Login
