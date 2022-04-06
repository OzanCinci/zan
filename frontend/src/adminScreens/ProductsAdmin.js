import React, { useEffect, useState } from 'react'
import { Button, Container, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate,useLocation} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts } from '../actions/productActions'
import { createAdminProduct, deleteProduct } from '../actions/adminActions'

export default function ProductsAdmin() {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const [temp,setTemp] = useState(false)
    const [exq,setExq] =useState("")
    const [ pageNumber,setPageNumber ]=useState(1)

    const productList =useSelector(state=>state.productList)
    const login =useSelector(state=>state.login)
    const createProduct =useSelector(state=>state.createProduct)

    const search = useLocation().search
    const q = new URLSearchParams(search).get('q')
    
    const {success,createdProduct} = createProduct
    const {userInfo}=login
    const {products,isUpdated,page,pages}=productList

    const handleCreate = (e) =>{
        e.preventDefault()
        dispatch(createAdminProduct(userInfo.access))
        setTemp(prev=>!prev)
    }

    const handleDelete = (id) =>{
        if (window.confirm(`Delete product with id:${id}?`)){
            dispatch(deleteProduct(userInfo.access,id))
            dispatch(listProducts(q))
            setTemp(prev=>!prev)
        }
    }

    const changePage = (pageNumber)=>{
        if (pageNumber!=page){
            dispatch(listProducts(q,pageNumber))
            setPageNumber(pageNumber)
        }
    }

    useEffect(()=>{
        if( !userInfo || !userInfo.isAdmin){
            nav('/')
        }
        if (products.length==0 || isUpdated){
            dispatch(listProducts(q,pageNumber))
            
        }
        if (q!=exq){
            console.log("q2: ",q)
            dispatch(listProducts(q,pageNumber))
            setExq(q)
        }
        if (success){

            const url = `/admin/product/${createdProduct._id}`
            dispatch(listProducts(q,pageNumber))
            dispatch({type:"CREATE_PRODUCT_RESET"})
            nav(url)
        }
    },[products.length,success,createdProduct,temp,isUpdated,q])

  return (
    <Container>
        <h4>Admin panel</h4>
        <Button onClick={handleCreate} style={{display:"block",marginRight:'0',marginLeft:'auto'}} variant="dark"><i className="far fa-plus-square"></i>  Create Product</Button>
        <Table striped hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>EDIT</th>
                </tr>
            </thead>
                
            <tbody>
                {products.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>
                                <p>{item._id}</p>
                            </td>
                            <td>
                                <p>{item.name}</p>
                            </td>
                            <td>
                                <p>{item.price}</p>
                            </td>
                            <td>
                                <p>{item.countInStock}</p>
                            </td>
                            <td>
                                <p>{item.category}</p>
                            </td>
                            <td>
                                <p>{item.brand}</p>
                            </td>
                            <td>
                                <LinkContainer to={`/admin/product/${item._id}`}>
                                    <Button variant="outline-dark"><i className="fas fa-edit"></i></Button>
                                </LinkContainer>
                                <Button onClick={()=>handleDelete(item._id)} variant="outline-danger"><i className="fa-regular fa-trash-can"></i></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <hr></hr>
        {page!=1 && <Button onClick={()=>changePage(page-1)}  variant="outline-dark">Prev</Button>}
        {Array.apply(null, Array(pages)).map((item,index)=>{
            return (
                <Button key={index} active={index+1==page} onClick={()=>changePage(index+1)} variant="outline-dark">{index+1}</Button>
            )
        })}
        {pages!=page && <Button onClick={()=>{changePage(page+1)}} variant="outline-dark">Next</Button>}

    </Container>
  )
}
