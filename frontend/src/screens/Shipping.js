import React, { useEffect, useState } from 'react'
import {Form,Button,Container, Row,Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import './Login.css'
import { LinkContainer } from 'react-router-bootstrap'
import { saveAdress } from '../actions/cartActions'
import Steps from '../components/Steps'

export default function Shipping() {
    const navigate = useNavigate()
    const [adress,setadress]=useState('')
    const [postalCode,setpostalCode]=useState('')
    const [city,setcity]=useState('')
    const [country,setcountry]=useState('')



    const dispatch = useDispatch()
    const login = useSelector(state=>state.login)
    const CartItems = useSelector(state=>state.CartItems)
    const {shippingAdress} = CartItems
    const {userInfo} = login

    useEffect(()=>{
        if (!userInfo){
            navigate(`/`)
        }
        if (shippingAdress){
            setadress(shippingAdress.adress?shippingAdress.adress:"")
            setpostalCode(shippingAdress.postalCode?shippingAdress.postalCode:"")
            setcity(shippingAdress.city?shippingAdress.city:"")
            setcountry(shippingAdress.country?shippingAdress.country:"")
        }
    },[userInfo])


    const handleClick = (e) =>{
        e.preventDefault()
        dispatch(saveAdress({adress:adress,postalCode:postalCode,city:city,country:country}))
        navigate("/payment")
    }


  return (
    <Container className='loginContainer my-2'>
        <Form className='login-form' >
            <Steps stepnumber={1}>asd</Steps>
            
            <h3>Shipping details...</h3>

            <Row>
                <Form.Group >
                    <Col className='login-col'>
                        <Form.Label>Adress:</Form.Label>
                        <Form.Control 
                        required
                        type="text-area" 
                        placeholder="Adress" 
                        value={adress?adress:""}
                        onChange={e=>{
                            setadress(e.target.value)}}/>
                    </Col>
                </Form.Group>
            </Row>


            <Row>
                <Form.Group >
                    <Col className='login-col'>
                        <Form.Label>Postal Code:</Form.Label>
                        <Form.Control 
                        required
                        type="postalCode" 
                        placeholder="Postal Code" 
                        value={postalCode?postalCode:""}
                        onChange={e=>{
                            setpostalCode(e.target.value)
                            }}/>
                    </Col>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group >
                    <Row>
                        <Col className='login-col'>
                            <Form.Label>City:</Form.Label>
                            <Form.Control 
                            required
                            type="city" 
                            placeholder="City" 
                            value={city?city:""}
                            onChange={e=>{
                                setcity(e.target.value)}}/>
                        </Col>
                    </Row>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group  >
                    <Row>
                        <Col className='login-col'>
                            <Form.Label>Country:</Form.Label>
                            <Form.Control
                            required
                            className='my-2' 
                            type="country" 
                            placeholder="Country" 
                            value={country?country:""}
                            onChange={e=>{
                                setcountry(e.target.value)}}/>
                        </Col>
                    </Row>
                </Form.Group>
            </Row>
               

            <Row className='mx-1'>
                    <Button onClick={handleClick} variant="primary">
                        Continue
                    </Button>
            </Row>
        </Form>
    </Container>
  )
}
