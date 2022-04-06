import React, { useEffect, useState } from 'react'
import {Form,Button,Container, Row,Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import '../screens/Login.css'
import { adminUpdateProductAction, getProductAdmin, getProductAdminAction } from '../actions/adminActions'
import axios from 'axios'

export default function EditProduct() {
    const {pk} = useParams()
    const dispatch=useDispatch()
    const navigate = useNavigate()

    const [productName,setProductName] = useState("")
    const [brand,setBrand] = useState("")
    const [category,setCategory] = useState("")
    const [description,setDescription] = useState("")
    const [stock,setStock] = useState(0)
    const [price,setPrice] = useState(0)

    const [image,setImage] = useState("")
    const [uploading,setUploading] = useState(false)



    const login = useSelector(state=>state.login)
    const getProductAdmin = useSelector(state=>state.getProductAdmin)


    const {product} = getProductAdmin
    const {userInfo} = login

    const handleImageUpload = async (e)=>{
        e.preventDefault()
        const file = e.target.files[0]
        const fData = new FormData()

        fData.append("image",file)
        fData.append("product_id",pk)

        try{
            const config = {
                'headers':{
                    'Content-Type':'multipart/form-data',
                }
            }
            const { data } = await axios.post('/api/products/admin/image/',fData,config)

            setImage(data)

        }catch(error){
            console.log("error during uploading image")
        }
    }


    const handleUpdate = (e) =>{
        e.preventDefault()
        if (userInfo.isAdmin){
            const dataObj={
                name:productName,
                brand:brand,
                category:category,
                description:description,
                price:price,
                countInStock:stock
            }
            dispatch(adminUpdateProductAction(userInfo.access,pk,dataObj))
            dispatch({type:"PRODUCT_DETAIL_UPDATED_BY_ADMIN"})
            navigate('/admin/products')
        }
    }

    useEffect(()=>{
       if (!userInfo.isAdmin){
            navigate('/')
       }
       if (!product || (product&&product._id!=pk)){
           dispatch(getProductAdminAction(userInfo.access,pk))
       }
       if (product && (product.name!=productName||product.brand!=brand||product.category!=category||product.description!=description||product.price!=price||product.countInStock!=stock)){
            setProductName(product.name)
            setBrand(product.brand)
            setCategory(product.category)
            setDescription(product.description)
            setStock(product.countInStock)
            setPrice(product.price)
            setImage(product.image)
       }
    },[product])

  return (
    <Container className='loginContainer my-2'>
        <Row fluid="true">
            <Col className='my-4' lg={6}>
                
                <Form className='login-form' style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                
                <LinkContainer   to='/admin/products'>
                    <Button id='goback-btn' variant="outline-secondary">Go Products Page</Button>
                </LinkContainer>

                <h4>Edit Product:</h4>
                    <Row>
                        <Form.Group >
                            <Col className='login-col'>
                                <Form.Label>Product Name:</Form.Label>
                                <Form.Control 
                                required
                                type="name" 
                                placeholder="Edit name" 
                                value={productName}
                                onChange={e=>{
                                    setProductName(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group >
                            <Col className='login-col'>
                                <Form.Label>Product Image:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Upload an image"
                                    value = {image}
                                    onChange={(e)=>setImage(e.target.value)}
                                ></Form.Control>
                                <input
                                    type='file'
                                    id="image-file"
                                    Label="choose-file"
                                    custom
                                    onChange={handleImageUpload}
                                >
                                </input>



                                
                                
                            </Col>
                        </Form.Group>
                    </Row>


                    <Row>
                        <Form.Group >
                            <Col className='login-col'>
                                <Form.Label>Product brand:</Form.Label>
                                <Form.Control 
                                required
                                type="text" 
                                placeholder="Edit brand" 
                                value={brand}
                                onChange={e=>{
                                    setBrand(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group >
                            <Col className='login-col'>
                                <Form.Label>Product category:</Form.Label>
                                <Form.Control 
                                required
                                type="text" 
                                placeholder="Edit category" 
                                value={category}
                                onChange={e=>{
                                    setCategory(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group >
                            <Col className='login-col'>
                                <Form.Label
                                style={{width:'155%',transform:"translateX(-17%)"}}>Product description:</Form.Label>
                                <Form.Control 
                                style={{height:'20vh',width:'155%',transform:"translateX(-17%)"}}
                                required
                                as="textarea"
                                placeholder="Edit description" 
                                value={description}
                                onChange={e=>{
                                    setDescription(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group >
                            <Col className='login-col'>
                                <Form.Label>Product price:</Form.Label>
                                <Form.Control 
                                required
                                type="number" 
                                placeholder="Edit price" 
                                value={price}
                                onChange={e=>{
                                    setPrice(e.target.value)}}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                            <Form.Group >
                                <Col className='login-col'>
                                    <Form.Label>Product Stock:</Form.Label>
                                    <Form.Control 
                                    required
                                    type="number" 
                                    placeholder="Edit stock" 
                                    value={stock}
                                    onChange={e=>{
                                        setStock(e.target.value)}}/>
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
