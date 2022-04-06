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


export default function ProductPage() {
    const [amount,setAmount] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()

    const [rating,setRating] = useState(5)
    const [comment,setComment] = useState('')

    const dispatch = useDispatch()
    const producDetail = useSelector(state=>state.producDetail)
    const login = useSelector(state=>state.login)
    const reviewReducer = useSelector(state=>state.reviewReducer)

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
        dispatch(listProductDetails(id))
    },[])

    const handleAddToCart = () =>{
        console.log("carta eklemesi lazim")
        dispatch({type:"ADD",payload:{productID:id,amount:amount}})
        setAmount(0)
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
    <div>
        <LinkContainer  to='/'>
            <Button id='goback-btn' variant="outline-secondary">Go Back</Button>
        </LinkContainer>
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
                                {(product.countInStock>0) && <Button onClick={()=>handleAddToCart()} variant="outline-dark">Add to Cart</Button>}
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
