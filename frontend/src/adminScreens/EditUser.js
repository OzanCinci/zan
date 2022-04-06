import React, { useEffect, useState } from 'react'
import {Form,Button,Container, Row,Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import '../screens/Login.css'
import { adminUpdateUserAction, adminUserAction } from '../actions/adminActions'

export default function EditUser() {
    const {pk} = useParams()
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [adminStatus,setAdminStatus] = useState(false)

    const login = useSelector(state=>state.login)
    const adminUser = useSelector(state=>state.adminUser)

    const {userInfo} = login
    const {User} = adminUser

    const handleUpdate = (e) =>{
        e.preventDefault()
        if (User){
            const dataObj={
                name:username,
                email:email,
                isAdmin:adminStatus
            }
            dispatch(adminUpdateUserAction(userInfo.access,pk,dataObj))
            navigate('/admin/users')
        }
    }

    
    console.log("loop control edit-user!")
    useEffect(()=>{
       if (!userInfo.isAdmin){
            navigate('/')
       }
       if (!User || User.id!= pk){
        dispatch(adminUserAction(userInfo.access,pk))
       }
       if (User && (User.email!=email||User.username!=username||User.isAdmin!=adminStatus)){
            setEmail(User.email?User.email:"")
            setUsername(User.username?User.username:"")
            setAdminStatus(User.isAdmin?User.isAdmin:false)
       }
    },[User])

  return (
    <Container className='loginContainer my-2'>
        <Row fluid="true">
            <Col className='my-4' lg={6}>
                <Form className='login-form' style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                
                <LinkContainer  to='/admin/users'>
                    <Button id='goback-btn' variant="outline-secondary">Go Users Page</Button>
                </LinkContainer>

                <h4>Edit User:</h4>
                    <Row>
                        <Form.Group >
                            <Col className='login-col'>
                                <Form.Label>User Name:</Form.Label>
                                <Form.Control 
                                required
                                type="username" 
                                placeholder="Edit name" 
                                value={username}
                                onChange={e=>{
                                    setUsername(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>


                    <Row>
                        <Form.Group >
                            <Col className='login-col'>
                                <Form.Label>Email address:</Form.Label>
                                <Form.Control 
                                required
                                type="email" 
                                placeholder="Edit email" 
                                value={email}
                                onChange={e=>{
                                    setEmail(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group >
                            <Col  >
                                <Form.Check 
                                className='mx-2'
                                style={{display:'inline-block'}}
                                type="checkbox"  
                                value={adminStatus}
                                checked={adminStatus}
                                onChange={e=>{
                                    setAdminStatus(!adminStatus)}}/>
                                Admin status
                            </Col>
                        </Form.Group>
                    </Row>
                    

                    <Row className='mx-1'>
                        <Button onClick={handleUpdate} variant="primary" type="submit">
                            Update
                        </Button>
                    </Row>
                </Form>
            </Col>
            
        </Row>                            
    </Container>
  )
}
