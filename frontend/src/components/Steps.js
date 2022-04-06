import React from 'react'
import { Col, Row ,Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function Steps({stepnumber}) {
  const steps = ["Login","Shipping","Payment","Place Order"]
  let color = 0
    return (
    <div>
        <Row>
            
            <Col >
                <LinkContainer  style={{cursor:'pointer',color:0<=stepnumber?"black":"rgba(0, 0, 0, 0.33)"}} to='/shipping'>
                    <p >{steps[0]}</p>
                </LinkContainer>
            </Col>
            
            <Col >
                <LinkContainer style={{cursor:'pointer',color:1<=stepnumber?"black":"rgba(0, 0, 0, 0.33)"}} to='/shipping'>
                    <p >{steps[1]}</p>
                </LinkContainer>
            </Col>
            
            <Col >
                <LinkContainer style={{cursor:'pointer',color:2<=stepnumber?"black":"rgba(0, 0, 0, 0.33)"}} to='/payment'>
                    <p >{steps[2]}</p>
                </LinkContainer>
            </Col>

            <Col >
                <LinkContainer style={{cursor:'pointer',color:3<=stepnumber?"black":"rgba(0, 0, 0, 0.33)"}} to='/placeorder'>
                    <p >{steps[3]}</p>
                </LinkContainer>
            </Col>
        </Row>
    </div>
  )
}
