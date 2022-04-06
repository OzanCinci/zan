import React from 'react'
import { Navbar, Container , Nav, Button, NavDropdown} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { logoutAction } from '../actions/loginAction'
import { useState } from 'react'
import {  Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function Header() {
  const login = useSelector(state=>state.login)
  const {userInfo} = login
  const dispatch =  useDispatch()

  const [keyword,setKeyword] = useState("")
  const pathname = window.location.pathname
  const navigate = useNavigate()

  const handleSearch = (e)=>{
      e.preventDefault()
      if (keyword){
        if (pathname.includes('admin')){
          navigate(`/admin/products?q=${keyword}`)
        } else {
          navigate(`/?q=${keyword}`)
        }
        setKeyword("")
      }
  }

  const handleLogOut = ()=>{
    localStorage.setItem('userInfo',null)
    dispatch(logoutAction())
  }

  return (
    <header>
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Container>

                <LinkContainer to='/'>
                  <Navbar.Brand>zanShop</Navbar.Brand>
                </LinkContainer>
                
                {userInfo && 
                  <Button disabled style={{backgroundColor:'transparent'}}>
                    {userInfo.username}
                  </Button>}

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                  

                  {userInfo && userInfo.isAdmin &&<NavDropdown style={{color:'white'}} title="Admin Panel">
                    <NavDropdown.Item>
                      <LinkContainer to='/admin/users' >
                          <p>Users</p>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <LinkContainer to='/admin/orders' >
                          <p>Orders</p>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <LinkContainer to='/admin/products' >
                          <p>Products</p>
                        </LinkContainer>
                    </NavDropdown.Item>
                  </NavDropdown>}

                <Navbar.Collapse id="responsive-navbar-nav">

                <Form style={{display:"flex",margin:"10px auto",justifyContent:'center'}}  onSubmit={handleSearch} >
                    <Form.Control
                    style={{maxWidth:"350px",display:"inline-block"}}
                    className='mr-sm-2 ml-sm-5'
                    type='text'
                    value={keyword}
                    onChange={(e)=>setKeyword(e.target.value)}>
                    </Form.Control>
                    <Button  type='submit'><i className="fa-solid fa-magnifying-glass"></i></Button>
                </Form>




                  <Nav className="ms-auto">
                      <LinkContainer to='/' >
                        <Nav.Link><i className='fas fa-home'></i>Home</Nav.Link>
                      </LinkContainer>
                    
                      {userInfo && 
                        <LinkContainer to="/profile">
                          <Nav.Link ><i className='fas fa-user'></i>Profile</Nav.Link>
                        </LinkContainer>}

                      <LinkContainer to="/cart">
                        <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                      </LinkContainer>

                      {!userInfo && <LinkContainer to="/login">
                        <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                      </LinkContainer>}

                      {userInfo && 
                        <LinkContainer onClick={handleLogOut} to="/login">
                          <Nav.Link ><i className='fas fa-sign-out'></i>Log out</Nav.Link>
                        </LinkContainer>}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </>
    </header>
  )
}
