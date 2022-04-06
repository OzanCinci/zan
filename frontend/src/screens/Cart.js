import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Row,Col,ListGroup, Image, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getCartItems, handleDECactions, handleDeleteactions, handleINCactions } from '../actions/cartActions'
import './Cart.css'
import { LinkContainer } from 'react-router-bootstrap'

export default function Cart() {
  const nav = useNavigate()
  const [cost,setCost] = useState(0)
  const dispatch = useDispatch()
  const Cart = useSelector(state=>state.Cart)
  const CartItems = useSelector(state=>state.CartItems)
  const {CartItemsArray,TotalCost} = CartItems
  const {itemIDs} = Cart

  const handleClick = (e)=>{
    e.preventDefault()
    dispatch({type:"COST",payload:cost})
    nav("/shipping")
  }

  const handleINC = (item) =>{
    if (item.countInStock>item.amount){
      setCost(prev=>parseFloat(prev)+parseFloat(item.price))
      dispatch(handleINCactions(item))
      dispatch({type:"COST",payload:cost})
    }
  }

  const handleDEC = (item) =>{
    if (cost>0){
      setCost(prev=>parseFloat(prev)-parseFloat(item.price))
      dispatch(handleDECactions(item))
      dispatch({type:"COST",payload:cost})
    }
  }

  const handleDelete = (item) =>{
      dispatch(handleDeleteactions(item))
  }
  
  
  useEffect(()=>{
    setCost(0)
    dispatch(getCartItems(itemIDs))
    console.log("loop control!")
    CartItemsArray.forEach(item=>setCost(prev=>prev+(item.price*item.amount)))
  },[CartItemsArray.length])

  return (
    <>
      {CartItemsArray.map(item=>{
        return (
          <ListGroup key={item._id} className="oneBlock" variant="flush">
            <ListGroup.Item >
            <Row>
              <Col xl={5} sm={5} md={5} lg={5} xxl={5}>
                <Image rounded fluid src={item.image}></Image>
              </Col>
              <Col xl={4} sm={4} md={4} lg={4} xxl={4} className="cartCol2">
                <Row>
                  <h5 style={{textAlign:'left',textTransform:'capitalize'}}>{item.name.toLowerCase()}</h5>
                </Row>
                <Row>
                  <big>${parseFloat(item.amount*item.price).toFixed(2)}</big>
                  <p></p>
                  <small style={{color:'grey'}}>({item.amount} x ${item.price})</small>
                </Row>
              </Col>
              
              <Col xl={3} sm={3} md={3} lg={3} xxl={3} className="cartCol3">
                <Row>
                  <Button onClick={()=>handleINC(item)}  variant="outline-dark">+</Button>
                </Row>

                <Row>
                  {item.amount!=0 &&<Button variant="outline-success">Confirm ({item.amount})</Button>}
                </Row>

                <Row>
                    {item.amount!==0  && <Button onClick={()=>handleDEC(item)}  variant="outline-dark">-</Button>}
                    {item.amount==0 && <Button onClick={()=>handleDelete(item)}  variant="outline-danger">Delete</Button>}
                </Row>
              
              </Col>
            
            </Row>
            <hr></hr>
          </ListGroup.Item>
          
        </ListGroup>
        )
      })}
      {!(parseFloat(cost)>0)?
        <p>Your Cart is empty.</p>
        :<> 
        <p>Total cost: ${parseFloat(cost).toFixed(2)}</p>
          <Button  onClick={handleClick} variant="outline-dark">Confirm All</Button>
        </>}
    </>
  )
}
