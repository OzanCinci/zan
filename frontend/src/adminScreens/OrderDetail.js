import React, { useEffect, useState } from 'react'
import {Form,Button,Container, Row,Col, ListGroup, Image, Table} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
//import '../screens/Login.css'
import { profileAction } from '../actions/profileAction'
import { getOrderDetailAdminAction } from '../actions/adminActions'
import { LinkContainer } from 'react-router-bootstrap'

export default function OrderDetail() {
    const {id} = useParams()
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const [name,setName] = useState('')
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const profile = useSelector(state=>state.profile)
    const login = useSelector(state=>state.login)
    const getOrderDetailAdmin = useSelector(state=>state.getOrderDetailAdmin)


    const {order}  =getOrderDetailAdmin
    const {userInfo} = login
    const { currentUser } = profile
    
    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            navigate('/')
        }
        dispatch(profileAction(userInfo.access))
        dispatch(getOrderDetailAdminAction(userInfo.access,id))
        if (order && order!=[] && order.createdAt){
            let tmp = `${order.createdAt.slice(8,10)} ${months[parseInt(order.createdAt.slice(5,7)) -1]} ${order.createdAt.slice(0,4)} `
            setName(tmp)
        }
    },[currentUser.id,id])


    
  return (
    <Container className='loginContainer my-2'>
            {order && order.user && <ListGroup >
                    <Row className='my-3' style={{width:"130px"}}>
                        <LinkContainer to='/admin/orders'>
                            <Button variant="outline-secondary">
                                Go Back
                            </Button>
                        </LinkContainer>
                    </Row>
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>Price</th>
                                    <th>USER</th>
                                    <th>Payment</th>
                                    <th>DELIVERED</th>
                                    <th>ADDRESS</th>
                                </tr>
                            </thead>
                                
                            <tbody>
                                <tr>
                                    <td>
                                        <p>{name}</p>
                                    </td>
                                    <td>
                                        <p>${order.totalPrice}</p>
                                    </td>
                                    <td>
                                        <p>{order.user.email}</p>
                                    </td>
                                    <td>
                                        <p> {order.paymentMethod}</p>
                                    </td>
                                    <td>
                                        <p>{order.deliveredAt?"Delivered":"Not Delivered"}</p>
                                    </td>
                                    <td>
                                        <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postalCode}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                
                        <Row style={{maxWidth:"600px",margin:"0 auto"}}>
                            {order && order.orderItems && order.orderItems.map((product,index)=>{
                                
                                return (
                                    <ListGroup.Item key={index}>
                                        <Row style={{maxWidth:"600px"}} >
                                                <Col sm={2}>
                                                    <Image fluid src={product.image}></Image>
                                                </Col>
                                                <Col className='py-2' sm={9}>
                                                    <p>{product.qty} X {product.name}</p>
                                                    <p>${((product.qty*product.price)+(product.qty*product.price)/5).toFixed(2)}</p>
                                                </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })}
                        </Row>
            </ListGroup>}
    </Container>
  )
}
