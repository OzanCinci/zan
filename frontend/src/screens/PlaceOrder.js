import React, { useEffect, useState } from 'react'
import { Button, Container, Row ,Form, Col, Image, ListGroup} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getOrdersAction, orderAction } from '../actions/orderActions'
import Steps from '../components/Steps'
import './PlaceOrder.css'



export default function PlaceOrder() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const login = useSelector(state=>state.login)
    const {userInfo}=login
    const CartItems = useSelector(state=>state.CartItems)
    const orderCreate = useSelector(state=>state.orderCreate)
    const {success,error,order} = orderCreate
    const [fullAddress,setFullAddress]=useState("")
    const {shippingAdress,paymentMethod,CartItemsArray,TotalCost} = CartItems
    console.log("TotalCost: ",TotalCost)

    const handleConfirm = (e)=>{
        e.preventDefault()
        dispatch(orderAction({
            token:userInfo.access,
            OrderItems:CartItemsArray,
            paymentMethod:paymentMethod,
            taxPrice:(TotalCost/5.8),
            shippingPrice:0,
            totalPrice:(TotalCost + TotalCost/5.8),
            shippingAdress:shippingAdress,
        }))
        dispatch({type:"RESET_ID"})
        dispatch({type:"RESET_CART_ITEMS"})
        dispatch(getOrdersAction(userInfo.access))
        nav('/profile')
    }

    if(!paymentMethod){
        nav('/payment')
    }

    useEffect(()=>{
        if (success){
            nav("/profile")
        }
        setFullAddress(shippingAdress.adress+', '+shippingAdress.postalCode+', '+shippingAdress.city+', '+shippingAdress.country)
    },[])

  return (
    <Container className='my-2'>
                <Row id='step'>
                    <Steps stepnumber={3}></Steps>
                </Row>
                <Row >
                    {error&&<p>{error}</p>}
                </Row>
                
            <Form className='placeorder-form' >
                <Row >
                    <Col style={{textAlign:"left"}} sm={7}>
                        <Row>
                            <h5>Shipping:</h5>
                            <p>{fullAddress}</p>
                        </Row>
                        <hr></hr>
                        <Row>
                            <h5>Payment Method:</h5>
                            <p>{paymentMethod}</p>
                        </Row>
                        <hr></hr>
                        <Row>
                            <h5>Order Items:</h5>
                            {CartItemsArray.length==0?<p>Your cart is empty</p>:CartItemsArray.map(item=>{
                                return(
                                    <ListGroup key={item._id}  variant="flush">
                                    <ListGroup.Item>
                                    <Row className="my-3">
                                    <Col sm={2}>
                                        <Image  rounded fluid src={item.image}></Image>
                                    </Col>
                                    <Col sm={10}>
                                            <Row>
                                            <h5 style={{textAlign:'left',textTransform:'capitalize'}}>{item.name.toLowerCase()}</h5>
                                            </Row>
                                            <Row>
                                            <small style={{color:'grey'}}>({item.amount} x ${item.price}) = ${(item.amount*item.price).toFixed(2)} </small>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                </ListGroup>
                                )
                            })}
                        </Row>
                    </Col>

                    <Col className='my-3' sm={5}>
                        <ListGroup>
                            <ListGroup.Item as='h4'>Order Summary</ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${TotalCost? TotalCost.toFixed(2):0}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${0}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${TotalCost? (TotalCost/5.8).toFixed(2):0}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>{TotalCost? (TotalCost + TotalCost/5.8).toFixed(2):0}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>

                        <Button onClick={handleConfirm} variant="primary">
                            Confirm Order
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
  )
}
