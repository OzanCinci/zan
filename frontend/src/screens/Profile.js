import React, { useEffect, useState } from 'react'
import {Form,Button,Container, Row,Col,Alert, ListGroup, Image} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import './Login.css'
import { profileAction } from '../actions/profileAction'
import { getOrdersAction } from '../actions/orderActions'

export default function Profile() {
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    let name = ""
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [msg,setMsg]=useState('')

    const profile = useSelector(state=>state.profile)
    const login = useSelector(state=>state.login)
    const getOrder = useSelector(state=>state.getOrder)
    const {orders} = getOrder

    const {userInfo} = login
    const { currentUser } = profile
    
    console.log("loop control profile!")
    useEffect(()=>{
        if(!userInfo){
            navigate('/')
        }
        dispatch(profileAction(userInfo.access))
        if (currentUser){
            setEmail(currentUser.email? currentUser.email: "")
            setUsername(currentUser.name? currentUser.name: "")
        }
        dispatch(getOrdersAction(userInfo.access))
    },[currentUser.id])

  return (
    <Container className='loginContainer my-2'>
        <Row fluid="true">
            <Col className='my-4' lg={6}>
                <Form className='login-form' style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <h4>Profile Informations</h4>
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
                                    setUsername(e.target.value)}}/>
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
                                    setEmail(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group >
                            <Row>
                                <Col className='login-col'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={e=>{
                                        setPassword(e.target.value)
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
                                    className='my-2' 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    value={confirmPassword}
                                    onChange={e=>{
                                        setConfirmPassword(e.target.value)
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
                            Update
                        </Button>
                    </Row>
                </Form>
            </Col>
            
            
            
            <Col className='my-4' lg={6}>
                <Form className='login-form'  style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <h4>My Orders</h4>
                    {orders.length==0 && <p>You have no order.</p>}
                    <ListGroup >
                        {orders.map((item,index)=>{
                            name = `${item.createdAt.slice(8,10)} ${months[parseInt(item.createdAt.slice(5,7))]} ${item.createdAt.slice(0,4)} `
                            return (
                                <ListGroup.Item  className='my-2 mx-5' style={{maxWidth:"450px",textAlign:"left"}} key={index}>
                                    <Row>
                                        <h5>{name}      <i className="fa-solid fa-arrow-right"></i>             ${item.totalPrice} </h5>
                                        <hr></hr>
                                        {item.orderItems.map((product,index)=>{
                                            return (
                                                <Row key={index}>
                                                    <Col sm={3}>
                                                        <Image style={{maxHeight:"80px",display:"block" ,margin:"0 auto"}} fluid src={product.image}></Image>
                                                    </Col>
                                                    <Col sm={9}>
                                                        <small>{product.qty} X </small>
                                                        <small>{product.name}</small>
                                                        <p>${((product.qty*product.price)+(product.qty*product.price)/5).toFixed(2)}</p>
                                                    </Col>
                                                </Row>
                                            )
                                        })}
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Form>
            </Col>
        </Row>                            
    </Container>
  )
}
