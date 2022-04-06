import React, { useEffect } from 'react'
import { Button, Container, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { adminUsersAction, deleteUser } from '../actions/adminActions'
import { LinkContainer } from 'react-router-bootstrap'

export default function Users() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const login =useSelector(state=>state.login)
    const adminUsers =useSelector(state=>state.adminUsers) 
    const {userInfo}=login
    const {Users,succes}=adminUsers

    const handleDelete = (id) =>{
        if (window.confirm(`Delete user with id:${id}?`)){
            dispatch(deleteUser(userInfo.access,id))
        }
    }
    
    

    useEffect(()=>{
        if( !userInfo || !userInfo.isAdmin){
            nav('/')
        }
        dispatch(adminUsersAction(userInfo.access))
    },[dispatch,succes,nav])

  return (
    <Container>
        <h4>Admin panel</h4>
        <Table striped hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th>EDIT</th>
                </tr>
            </thead>
                
            <tbody>
                {Users.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>
                                <p>{item.id}</p>
                            </td>
                            <td>
                                <p>{item.username}</p>
                            </td>
                            <td>
                                <p>{item.email}</p>
                            </td>
                            <td>
                                <p>{item.isAdmin?<i style={{color:'green'}} className="fa-solid fa-check"></i>:"X"}</p>
                            </td>
                            <td>
                                <LinkContainer to={`/editUser/${item.id}`}>
                                    <Button variant="outline-dark"><i className="fas fa-edit"></i></Button>
                                </LinkContainer>
                                <Button onClick={()=>handleDelete(item.id)} variant="outline-danger"><i className="fa-regular fa-trash-can"></i></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </Container>
  )
}
