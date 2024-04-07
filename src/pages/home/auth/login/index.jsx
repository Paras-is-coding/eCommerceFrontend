import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import {ButtonComponent} from '../../../../component/common/button/button.component'
import { useForm } from 'react-hook-form'

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import authSvc from '../auth.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LoginTitle= styled.p`
color:grey;
text-align:center;
`

export default function Login() { 

    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    const loginSchema = yup.object({
        email:yup.string().email().required(),
        password: yup
        .string()
        .required('Password is required')
    });

    // react-hook-form implementation
    const {register, handleSubmit, formState:{errors}} = useForm({resolver:yupResolver(loginSchema)});

    const loginSubmit = async (data) =>{
        try{
            setLoading(true);      
              // API Call
            const response = await authSvc.loginProcess(data);
                console.log(response)
                setLoading(false);

                // based on the user type we need to redirect the user  
                // another API call of /me route with {auth:true}(ie set token to header)

                const loggedInUser = await authSvc.getLoggedInUser();
                localStorage.setItem("_user",JSON.stringify({
                    userId:loggedInUser?.data?.authUser?._id,
                    name:loggedInUser?.data?.authUser?.name,
                    role:loggedInUser?.data?.authUser?.role,
                }));

                toast.success(`Welcome ${loggedInUser?.data?.authUser?.role} to pannel.`)
                navigate('/'+loggedInUser?.data?.authUser?.role);
          }catch(e){
            setLoading(false);
            console.log(e);
            toast.error(e.response.data.message)
            // e.response.data.message.map((obj)=>{
            //   const keys = Object.keys(obj);
            //   setError(keys[0],obj[keys[0]]);
            // });
          }
    }


    // For next time click on login
    useEffect(()=>{
        let token = localStorage.getItem('_au');
        let user = JSON.parse(localStorage.getItem("_user"));
        if(token && user){
            toast.info("You're already logged in!")
            navigate('/'+user?.role);
        }
    },[])

  return (
    <React.Fragment> 

        <Container className='m-5'>
            <Row>
                <Col sm={12} md={{offset:3,span:6}}>
                <LoginTitle>L  ogin Page</LoginTitle>
                <Form onSubmit={handleSubmit(loginSubmit)}>

                    <Form.Group className="row mb-3">
                        <Form.Label className='col-sm-3'>Username:</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                            {...register("email",{required:true})}
                            type='email'
                            size='sm'
                            placeholder='enter your username'
                            />
                            <span className='text-danger'>
                            <em>{errors?.email?.message}</em>
                            </span>
                        </Col>
                    </Form.Group>
                    <Form.Group className="row mb-3">
                        <Form.Label className='col-sm-3'>Password:</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                            {...register("password",{required:true})}
                            type='password'
                            size='sm'
                            placeholder='enter your password'
                            />
                            <span className='text-danger'>
                                <em>{errors?.password?.message}</em>
                            </span>
                        </Col>
                    </Form.Group>
                    <Form.Group className="row mb-3">
                        <Col sm={{offset:3,span:9}}>
                            Or,&nbsp;
                            <a href='/forget-password'>Forget Password?</a>
                        </Col>
                    </Form.Group>
                    <Form.Group className="row mb-3">
                        <Col sm={{offset:3,span:9}}>
                          <ButtonComponent label="cancel" className="btn-danger me-2" type="reset"/>
                          <ButtonComponent label="login"/>
                        </Col>
                    </Form.Group>

                </Form>
                OR,&nbsp;
                <a href='/register'>Create an account</a>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
  )
}
