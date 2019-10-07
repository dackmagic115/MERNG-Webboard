import React , {useContext,useState} from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'

import { Form, Button } from 'semantic-ui-react'



const Register = (props) => {
    const context = useContext(AuthContext)
    const [ errors , setErrors ] = useState({})
    const [formData, setFormData] = useState({
        username : '',
        password : '',
        confirmpassword : '',
        email : ''
    })

    const { username , password , confirmpassword , email } = formData

    const onChange = (e) =>{
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const [Register , { loading }] = useMutation(REGISTER_USER,{
        update( _ , result){
            console.log(result)
            context.login(result.data.Register)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].data)
        },
        variables:{
            "username": username,
            "password": password,
            "password2": confirmpassword,
            "email": email
          }
    })

    const onSubmit = (e) =>{
        e.preventDefault()
        Register()

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
                    label = "Email"
                    placeholder = "email..."
                    type = "email"
                    name  = "email"
                    value = {email}
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
                    <Form.Input 
                    label = "Confirmpassword"
                    placeholder = "confirmpassword..."
                    type = "password"
                    name  = "confirmpassword"
                    value = {confirmpassword}
                    onChange = {onChange}
                />
                <Button type="submit" primary>
                    สมัครสมาชิก
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

const REGISTER_USER = gql`
    mutation($username : String , $password: String , $password2: String , $email : String){
        Register(record:{
            username:$username,
            password:$password,
            confirmpassword:$password2,
            email:$email
        }){
            email,
            token,
            _id,
            username,
            createAt
        }
        }
`

export default Register
