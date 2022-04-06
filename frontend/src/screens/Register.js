import React, { useEffect, useState } from 'react'
import {Form,Button,Container, Row,Col,Alert} from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { loginAction } from '../actions/loginAction'
import './Login.css'
import { registerAction } from '../actions/registerAction'

export default function Register() {
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [msg,setMsg]=useState('')


    const dispatch = useDispatch()
    const login = useSelector(state=>state.login)
    const {userInfo} = login
    const register = useSelector(state=>state.register)
    const {registerInfo,error,loading} = register

    const location = useLocation()
    const redirect = location.search? location.search.slice(10) : null

    const handleClick = (e) =>{
        e.preventDefault()
        if(password!=confirmPassword){
            setMsg("Passwords do not match!")
        } else {
            dispatch(registerAction(username,email,password))
            navigate('/login')
        }
    }

    useEffect(()=>{
        if (userInfo){
            navigate(`/`)
        }
    },[userInfo])


  return (
    <Container className='loginContainer my-2'>
        <Form className='login-form' onSubmit={handleClick}>
            
            <h3>Register a new account</h3>
            
            {error && email && password &&
                <Alert variant="danger">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                    {error}
                    </p>
            </Alert>}


            <Row>
                <Form.Group >
                    <Col className='login-col'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control 
                        required
                        type="username" 
                        placeholder="User name" 
                        value={username}
                        onChange={e=>{
                            setUsername(e.target.value)
                            dispatch({type:'LOGIN_REQUEST'})}}/>
                    </Col>
                </Form.Group>
            </Row>


            <Row>
                <Form.Group >
                    <Col className='login-col'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        required
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={e=>{
                            setEmail(e.target.value)
                            dispatch({type:'LOGIN_REQUEST'})}}/>
                    </Col>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group >
                    <Row>
                        <Col className='login-col'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            required
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={e=>{
                                setPassword(e.target.value)
                                dispatch({type:'LOGIN_REQUEST'})
                                setMsg("")}}/>
                        </Col>
                    </Row>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group  >
                    <Row>
                        <Col className='login-col'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                            required
                            className='my-2' 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={e=>{
                                setConfirmPassword(e.target.value)
                                dispatch({type:'LOGIN_REQUEST'})
                                setMsg("")}}/>
                            
                            {msg!="" &&
                                <Alert variant="danger">
                                    <h6>{msg}</h6>
                                </Alert>}   
                        </Col>
                    </Row>
                </Form.Group>
            </Row>
               

            <Row className='mx-1'>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Row>

            <Row>
                <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>
                    Have an account?
                </Link>
            </Row>
        </Form>
    </Container>
  )
}
