import React, { useEffect, useState } from 'react'
import {Form,Button,Container, Row,Col,Alert} from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { loginAction } from '../actions/loginAction'
import './Login.css'

export default function Login() {
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch = useDispatch()
    const login = useSelector(state=>state.login)
    const {userInfo,error,loading} = login

    const location = useLocation()
    const redirect = location.search? location.search.slice(10) : null

    const handleClick = (e) =>{
        e.preventDefault()
        dispatch(loginAction(email,password))
    }

    useEffect(()=>{
        if (userInfo){
            navigate(`/`)
        }
    },[userInfo])


  return (
    <Container className='loginContainer my-5'>
        <Form className='login-form' onSubmit={handleClick}>
            
            
            {error && email && password &&
                <Alert variant="danger">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                    {error}
                    </p>
            </Alert>}

            <Row>
                <Form.Group className="mw-10" >
                    <Col className='login-col'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={e=>{
                            setEmail(e.target.value)
                            dispatch({type:'LOGIN_REQUEST'})}}/>
                    </Col>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group className="mb-3" >
                    <Row>
                        <Col className='login-col'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={e=>{
                                setPassword(e.target.value)
                                dispatch({type:'LOGIN_REQUEST'})}}/>
                        </Col>
                    </Row>
                </Form.Group>
            </Row>


            <Row className='mx-1'>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Row>

            <Row>
                <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>
                    Not register yet?
                </Link>
            </Row>
        </Form>
    </Container>
  )
}
