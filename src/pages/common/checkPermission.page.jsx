import React, {useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authSvc from '../home/auth/auth.service';

export default function PermissionCheck({
    accessBy,
    Component
}) {
        {/* Todo: Logic ie if loggedIn and has accessBy Role */}
        const [loading,setLoading] = useState(true);
        const [user,setUser] = useState();
        const navigate = useNavigate();

        const getLoggedInUser =async ()=>{
          try {
            const response = await authSvc.getLoggedInUser();
            setUser(response?.data?.authUser);
          } catch (error) {
            localStorage.removeItem("_au");
            toast.error("You are not logged in!");
            navigate('/login');
          }finally{
            setLoading(false);
          }
        }

        useEffect(()=>{
          let token = localStorage.getItem("_au");
          if(!token){
            toast.error("You are not logged in!");
            navigate('/login');
          }else{
            getLoggedInUser()
          }
        },[])

        
        if(loading){
          return(<>
          <Container>
            <Row>
              <Col className='text-center my-5 py-5'>
              <Spinner variant='success'></Spinner>
              </Col>
            </Row>
          </Container>
          </>)
        }else if(user?.role === accessBy){
          return Component
        }else{
          return<Navigate to={"/"+user.role}></Navigate>
        }
}
