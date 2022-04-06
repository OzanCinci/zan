import React, {useEffect} from 'react'
import { Row, Col, Button, Carousel, Image } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

import { useDispatch ,useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import {useLocation} from "react-router-dom";

import './HomeScreen.css'
import { LinkContainer } from 'react-router-bootstrap'

export default function HomeScreen() {
    
    const search = useLocation().search;
    const q = new URLSearchParams(search).get('q');

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error,loading,products,page,pages} = productList

    useEffect(()=>{
        dispatch(listProducts(q))
    },[dispatch,q])

    const changePage = (num)=>{
        if (num!=page){
            dispatch(listProducts(q,num))
        }
    }

  return (
    <div id='main-thing'>
        <h3>Top Products</h3>
        


        {!q&&
            <Carousel id="carousel" className='py-4'  style={{maxWidth:'1200px',backgroundColor:"#343a40",margin:"20px auto"}}>

                    {products.map((item,index)=>{
                        return (
                            <Carousel.Item key={index}>
                                    <Col>
                                        <Carousel.Caption >
                                            <LinkContainer to={`products/${item._id}`}>
                                                <div id="container">
                                                    <h5>{item.name}</h5>
                                                    <div id="slide-p">
                                                        <p>Only for ${item.price}  - sold for {item.numReviews} times</p>
                                                    </div>
                                                </div>
                                            </LinkContainer>
                                        </Carousel.Caption>
                                    </Col>
                                    <Col className='my-5'>
                                        <Image id='slide-img' src={item.image}></Image>
                                    </Col>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>}



        {loading ? <p>Loading...</p>:error?<p>{error}</p>:
            <Row id='row-thing'>
            {products.map(item=>{
                return (
                    <Col key={item._id} sm={12} md={6} lg={4} xl={3} style={{minWidth:'400px'}}>
                        <ProductCard item={item}></ProductCard>
                    </Col>
                )
            })}
        </Row>}
        <hr></hr>
        {page!=1 && <Button onClick={()=>changePage(page-1)}  variant="outline-dark">Prev</Button>}
        {Array.apply(null, Array(pages)).map((item,index)=>{
            return (
                <Button key={index} active={index+1==page} onClick={()=>changePage(index+1)} variant="outline-dark">{index+1}</Button>
            )
        })}
        {pages!=page && <Button onClick={()=>changePage(page+1)} variant="outline-dark">Next</Button>}
        <hr></hr>
    </div>
  )
}
