import React from 'react'
import NavBar from '../../component/home/navbar'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Error404() {
  return (
    <>
    <Container className='m-5' style={{background:"#ff000029"}}>
        <Row>
            <Col className="text-center p-3"sm={12}>
                <p className='text-danger'>Opps! Your request doesnot exist!</p>
                <p className='text-danger '>Redirect 
                <NavLink to={"/"}>back to home</NavLink></p>

            </Col>
        </Row>
    </Container>
    </>
  )
}
