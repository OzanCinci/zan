import React, { useEffect, useState } from 'react'
import { Col, Container, Row,ListGroup,Button, Form, ListGroupItem } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import { LinkContainer} from 'react-router-bootstrap'
import Rating from '../components/Rating'
import './ProductPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { AddReviewAction } from '../actions/reviewActions'
import { getCartItems } from '../actions/cartActions'


export default function ProductPage() {
    const [amount,setAmount] = useState(1)
    const [money,setMoney] = useState(0)
    const {id} = useParams()
    const navigate = useNavigate()

    const [init,setInit] = useState(true)
    const [rating,setRating] = useState(5)
    const [comment,setComment] = useState('')
    const [showCart,setShowCart] = useState(false)

    const dispatch = useDispatch()
    const producDetail = useSelector(state=>state.producDetail)
    const login = useSelector(state=>state.login)
    
    
    const Cart = useSelector(state=>state.Cart)
    const CartItems = useSelector(state=>state.CartItems)
    const {CartItemsArray,TotalCost} = CartItems
    const {itemIDs} = Cart

    const {userInfo} = login
    const {loading,error,products} = producDetail 

    const navLogin = (e)=>{
        e.preventDefault()
        navigate('/login')
    }

    let reviews=[]
    if(products){
        reviews = products.reviews
    }
    const product = products

    useEffect(()=>{
        if(init){
            dispatch(listProductDetails(id))
            setInit(false)
            dispatch(getCartItems(itemIDs))
        }
        setMoney(0)
        
        CartItemsArray.forEach(item=>{
            setMoney(prev=>prev+(item.amount*item.price))
        })

        
    },[CartItemsArray.length])

    const handleDelete = (item) =>{
        dispatch({type:"DELETE",payload:item._id})
        dispatch({type:"DEL",payload:item._id})
        if(money==0){
            setShowCart(false)
        }
    }

    const handleAddToCart = () =>{
        dispatch({type:"ADD",payload:{productID:id,amount:amount}})
        setAmount(0)
        dispatch({type:"INC",payload:product._id})
        dispatch({type:"COST",payload:product.price * amount})
        dispatch(getCartItems(itemIDs))
        setShowCart(true)
    }

    const handleAddReview = (e) =>{
        e.preventDefault()
        if (userInfo){
            const dataObj = {
                rating:rating,
                comment:comment,
                username:userInfo.username
            }
            dispatch(AddReviewAction(userInfo.access,dataObj,id))
        }
        dispatch(listProductDetails(id))
        setComment("")
    }

  return (
    <div >
        {<div id='pop-up-cart' style={{overflowY:CartItemsArray.length>3?"scroll":"hidden",transition: 'all 1.3s ease-in-out',transform:showCart? 'translateX(-5%)' : 'translateX(300%)'}}>
        <Row>
            <Col className='my-2 mx-2'>
                <div id='close-cart-btn'style={{cursor:'pointer',color:'black'}} onClick={()=>navigate('/cart')}>go cart page</div>
            </Col>
            <Col className='my-2 mx-2'>
                <div id='close-cart-btn' style={{cursor:'pointer',color:'black',textAlign:"right"}} onClick={()=>setShowCart(false)}>close</div>
            </Col>
        </Row >

        <Row>
            <div id='header-cart'><h4>Your Cart<i className="fa-solid fa-arrow-right-long"></i>${money.toFixed(2)}</h4></div>
            <ListGroup>
                {CartItemsArray.map((item,index)=>{
                    let nameList = item.name.split(' ')
                    const min = 4<nameList.length ? 4 : nameList.length
                    const cartName = nameList.slice(0,min).join(' ')
                    return (
                        <ListGroup.Item key={index} variant='flush' style={{backgroundColor:'#e8eaec',border:"none"}}>
                            <Row>
                                <Col>
                                    <Image fluid sm={3} src={item.image}></Image>
                                </Col>
                                <Col sm={6}>
                                    <Row className='my-1' style={{color:'#6e1715'}}>
                                        {cartName}
                                    </Row>
                                    <Row>
                                        <small>{item.amount}x${item.price}=${(item.price * item.amount).toFixed(2)}</small>
                                    </Row>
                                </Col>
                                <Col sm={3}>
                                    <Button onClick={()=>handleDelete(item)} variant='danger'>X</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}    
            </ListGroup>
        </Row>
        </div>}
        {product&& <h4>{product.name}</h4>}
    
        {loading? <p>Loading...</p>:error?<p>{error}</p>: product&&
            <div>
            <LinkContainer style={{textAlign:'right', cursor:'pointer'}} to={`/brands/${product.brand}`}>
                <p>by {product.brand}</p>
            </LinkContainer>

            <hr></hr>
            <Container fluid>
                <Row>
                    <Col lg={6} className='colNo1'><Image fluid src={product.image}></Image></Col>
                    <Col lg={4} className='colNo2'>
                    <ListGroup variant="flush">
                        <ListGroup.Item><Rating rating={product.rating} numReviews={product.numReviews}></Rating></ListGroup.Item>
                        <ListGroup.Item>${product.price}</ListGroup.Item>
                        <ListGroup.Item>{product.description}</ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col lg={2}>
                        <ListGroup className='colNo3'>
                            <ListGroup.Item>
                                <Row >
                                    <Col>Price:</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Stock:</Col>
                                    <Col>{product.countInStock>=1?'In Stock':'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                
                                <Row id="amount-btn-parent">
                                    <Col>
                                        {(product.countInStock>0) && <Button onClick={()=>{
                                            if (amount!=product.countInStock) setAmount(prev=>prev+1)
                                        }} className='amount-btn'  variant="outline-dark">+</Button>}
                                        {!(product.countInStock>0) && <Button  className='amount-btn' disabled variant="outline-dark">+</Button>}
                                    </Col>

                                    <Col>
                                        <Button  className='amount-btn' disabled variant="outline-dark">Amount: {product.countInStock? amount: 0}</Button>
                                    </Col>

                                    <Col>
                                        {(product.countInStock>0) && <Button onClick={()=>{
                                            if(amount>1) setAmount(prev=>prev-1)
                                        }} className='amount-btn'  variant="outline-dark">-</Button>}
                                        {!(product.countInStock>0) && <Button  className='amount-btn' disabled variant="outline-dark">-</Button>}
                                    </Col>
                                
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                {(product.countInStock>0) && <Button disabled={amount==0} onClick={()=>handleAddToCart()} variant="outline-dark">Add to Cart</Button>}
                                {!(product.countInStock>0) && <Button disabled variant="outline-dark"><s>Add to Cart</s></Button>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>

                <Row className="my-4">
                    <Col sm={8}>
                        <Row style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                            <h5>All Reviews:</h5>
                            {reviews && reviews.length==0 && <p>No comment yet.</p>}
                            {reviews && reviews.map((item,index)=>{
                                return (
                                    <ListGroup style={{textAlign:"left", maxWidth:"500px"}}>
                                        <ListGroupItem className='p-4 my-2'>
                                            <Rating rating={item.rating} numReviews={0}></Rating>
                                            <Row ><p style={{textAlign:"right"}}>by {item.username}</p></Row>
                                            <hr></hr>
                                            <Row>{item.comment.slice(0,500)}...</Row>
                                        </ListGroupItem>
                                    </ListGroup>
                                )
                            })

                            }
                        </Row>
                    </Col>
                    
                    <Col sm={4}>
                        <h5>Add a review</h5>
                        {!userInfo && <Button onClick={navLogin}>Login to add a review</Button>}
                        {userInfo && <Form>
                            <Form.Group className="mw-10" >
                                <Row className='login-col'>
                                    
                                        <Form.Label>Rating:</Form.Label>
                                        <Form.Control
                                        required
                                        className='m-2'
                                        style={{width:"90px",textAlign:"left",display:'inline-block'}} 
                                        as="select"  
                                        value={rating}
                                        onChange={e=>setRating(e.target.value)}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        </Form.Control>
                                        <Rating rating ={rating} numReviews={0}/>
                                </Row>

                                <Row className='login-col'>
                                    <Form.Label>Comment:</Form.Label>
                                    <Form.Control
                                    required
                                    style={{width:"400px"}} 
                                    as="textarea"  
                                    rows='6'
                                    value={comment}
                                    onChange={e=>setComment(e.target.value)}>
                                    </Form.Control>
                                </Row>
                                <Col style={{textAlign:"right"}} className='my-2'>
                                    <Button onClick={handleAddReview}>
                                        Send review
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>}
                    </Col>
                </Row>
            </Container>
        </div>}

    </div>
  )
}
