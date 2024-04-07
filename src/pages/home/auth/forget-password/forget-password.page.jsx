import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import {ButtonComponent} from '../../../../component/common/button/button.component'
import { toast } from 'react-toastify'

const Title= styled.p`
color:grey;
text-align:center;
`


export default function ForgetPassword() {
    const [data,setData] = useState({
        email:"",
    });
    const handleChange = (e)=>{
        const{name,value}= e.target;
        setData({
            ...data,
            [name]:value
        })
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        // API Call 
        try {
            // success
            toast.success("An email is sent to your email account!");
            
        } catch (error) {
            // handle exception
            
        }

    }

  return (
    <React.Fragment> 

    <Container className='m-5'>
        <Row>
            <Col sm={12} md={{offset:3,span:6}}>
            <Title>Forget Password</ Title>
            <p className='text-center' style={{fontSize:"small"}}>
                <em>Please use the registered email for reset. You will receive an email for the resetting of your password. Follow the instruction from the email.</em>
            </p>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="row mb-3">
                    <Form.Label className='col-sm-3'>Username:</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                        onChange={handleChange}
                        value={data.email}
                        name='email'
                        type='email'
                        size='sm'
                        required
                        placeholder='enter your username'
                        />
                        <span className='text-danger'>
                            <em></em>
                        </span>
                    </Col>
                </Form.Group>
          
                <Form.Group className="row mb-3">
                    <Col sm={{offset:3,span:9}}>
                      <ButtonComponent label="cancel" className="btn-danger me-2" type="reset"/>
                      <ButtonComponent label="submit" type='submit'/>
                    </Col>
                </Form.Group>

            </Form>
            <a href='/login'>Login</a>
            &nbsp;&nbsp;
            OR,&nbsp;&nbsp;
            <a href='/register'>Create an account</a>
            </Col>
        </Row>
    </Container>
</React.Fragment>
  )
}
