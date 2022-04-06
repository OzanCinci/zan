import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

export default function ProductCard({item}) {
  return (
    <Card className='p-2 my-2 rounded-3' >
       
        <Card.Img style={{marginBottom:'15px'}} src={item.image}></Card.Img>
       
        <Card.Title as='h4'>{item.name}</Card.Title>
       
        <Link to={`products/${item._id}`}>{item.brand.toUpperCase()}</Link>
       
        <Card.Body>
        
            <Card.Text as='h5'>${item.price}</Card.Text>
        
            <Rating rating={item.rating} numReviews={item.numReviews} ></Rating>
        
            <Card.Text as='p' style={{textAlign:'left',padding:"0.5rem 0"}}>{item.description.slice(0,130)}...</Card.Text>
        
            <LinkContainer to={`/products/${item._id}`}>
                <Card.Text style={{marginTop:'10px'}} ><Button variant="outline-dark" >Details</Button></Card.Text>
            </LinkContainer>
        
        </Card.Body>
    </Card>
  )
}
