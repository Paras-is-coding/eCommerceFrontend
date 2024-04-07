import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner, ToastHeader } from 'react-bootstrap'
import styled from 'styled-components'
import SetPasswordComponent from '../../../../component/home/auth/set-password.component'
import { useNavigate, useParams } from 'react-router-dom'
import authSvc from '../auth.service'
import { toast } from 'react-toastify'

const LoginTitle= styled.p`
color:grey;
text-align:center;
`

export default function SetPasswordPage() {
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();


  // TODO: to verify token API Call
    const params = useParams();
    const verifyToken = async ()=>{
        try {
            const verified = await authSvc.getActivationTokenVerify(params.token);
            console.log(verified);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);            
        }
    }
    useEffect(()=>{
        verifyToken();
    },[params]);



   const submitEvent =async (data) =>{
       try {
        const response = await  authSvc.activateUser(params.token,data);
        toast.success(response.message);
        navigate('/login');
       } catch (error) {
        toast.error(error.message);
        navigate("/");
       }
       
   }
  return (
    <React.Fragment> 

        <Container className='m-5'>
            <Row>
                <Col sm={12} md={{offset:3,span:6}}>
                <LoginTitle>Set Password Page</LoginTitle>
                {
                    (loading)?
                    <div className='text-center'><Spinner variant='dark'/> </div>:
                    <SetPasswordComponent submitEvent={submitEvent}/>
                }
                </Col>
            </Row>
        </Container>
    </React.Fragment>
  )
}
