import React, { useEffect } from 'react'
import { Button, Container, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { adminUsersAction, deleteUser, getOrdersAdminAction } from '../actions/adminActions'
import { LinkContainer } from 'react-router-bootstrap'

export default function Orders() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const login =useSelector(state=>state.login)
    const getOrdersAdmin =useSelector(state=>state.getOrdersAdmin)

    const {orders}=getOrdersAdmin
    const {userInfo}=login

    useEffect(()=>{
        if( !userInfo || !userInfo.isAdmin){
            nav('/')
        }
        dispatch(getOrdersAdminAction(userInfo.access))
    },[dispatch,nav])

  return (
    <Container>
        <h4>Orders:</h4>
        <Table striped hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Price</th>
                    <th>EMAIL</th>
                    <th>Payment</th>
                    <th>EDIT</th>
                </tr>
            </thead>
                
            <tbody>
                {orders.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>
                                <p>{item._id}</p>
                            </td>
                            <td>
                                <p>${item.totalPrice}</p>
                            </td>
                            <td>
                                <p>{item.user.email}</p>
                            </td>
                            <td>
                                <p>{item.paymentMethod}</p>
                            </td>
                            <td>
                                <LinkContainer to={`/OrderDetail/${item._id}`}>
                                    <Button variant="outline-dark"><i className="fas fa-edit"></i></Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </Container>
  )
}
