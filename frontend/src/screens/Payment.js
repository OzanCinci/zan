import React, { useEffect, useState } from 'react'
import { Container, Form, FormCheck,Row,Button,CardGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import Steps from '../components/Steps'
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const nav=useNavigate()
  const [value,setValue] = useState(null)
  const dispatch = useDispatch()
  const CartItems=useSelector(state=>state.CartItems)
  const {paymentMethod}=CartItems
    
    const handleClick=(e)=>{
        e.preventDefault()
        if(paymentMethod){
            nav('/placeorder')
        }
    }

  return (
        <Container className='loginContainer my-2'>
            <Form className='login-form'>
                <Steps stepnumber={2}></Steps>
                
                <CardGroup className='center'><h5>Your payment will be:</h5></CardGroup>

                <FormCheck
                    type="radio"
                    label="Paypal"
                    name="Paypal"
                    checked={"Paypal"==value}
                    onChange={()=>{
                        setValue("Paypal")
                        dispatch({type:"PaymentMethod",payload:"Paypal"})}}
                >
                </FormCheck>

                
                <FormCheck
                    type="radio"
                    label="American Express"
                    name="American Express"
                    checked={"American Express"==value}
                    onChange={()=>{
                        setValue("American Express")
                        dispatch({type:"PaymentMethod",payload:"American Express"})}}
                >
                </FormCheck>

                <FormCheck
                    type="radio"
                    label="Other"
                    name="Other"
                    checked={"Other"==value}
                    onChange={()=>{
                        setValue("Other")
                        dispatch({type:"PaymentMethod",payload:"Other"})}}
                >
                </FormCheck>

                
                <Row className='mx-1'>
                    <Button onClick={handleClick} variant="primary">
                        Continue
                    </Button>
                </Row>
            </Form>
        </Container>
  )
}
