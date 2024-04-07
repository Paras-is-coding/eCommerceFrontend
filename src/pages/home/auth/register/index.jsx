import React, { useState } from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import {ButtonComponent} from '../../../../component/common/button/button.component'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Select from 'react-select'

import imageplaceholder from "../../../../assets/images/imageplaceholder.svg"
import { toast } from 'react-toastify'
import authSvc from '../auth.service'
import { useNavigate } from 'react-router-dom'

const Title= styled.p`
color:grey;
text-align:center;
`
export default function RegisterPage() {

    const [thumb,setThumb] = useState();
    const [loading,setLoading] = useState(false);



    const registerSchema = yup.object({
        name:yup.string().min(2).max(30).required(),
        email:yup.string().email().required(),
        role:yup.object({
            value:yup.string().matches(/customer|seller/),
            label:yup.string().matches(/Seller|Customer/)
        }).required()
    });

    
const options = [
    { value: 'seller', label: 'Seller' },
    { value: 'customer', label: 'Customer' }
  ]

    const handleImageUpload = (e)=>{

            // const files = Object.values(e.target.files); //{{},{}} => [{},{}]
            const image = e.target.files[0];

            // validation(ext,size)
            const ext = image.name.split(".").pop();
            if(['jpg','png','jpeg','gif','svg','bmp','webp'].includes(ext.toLowerCase())){
                if(image.size <= 3000000){

                    setThumb(image);
                    setValue("image",image);
                }else{
                    setError("image","File should be less then 3MB.")
                }
            }else{
                setError("image","File format not supported!");
            }
        
               
    }


    // react-hook-form implementation
    const {register, handleSubmit,setValue,setError, formState:{errors}} = useForm({
        resolver:yupResolver(registerSchema)
    });

    const registerSubmit = async (data) =>{
      try{
        setLoading(true);
          // mapping before submit here 
          data.role = data.role.value;
          console.log(data)
  
          // API Call
          const response = await authSvc.registerProcess(data);
            console.log(response)
            setLoading(false);
            toast.success(response.data.message)
            navigate('/');
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


  return (
    <React.Fragment>
      <Container className="m-5">
        <Row>
          <Col sm={12} md={{ offset: 2, span: 8 }}>
            <Title>Register Page</Title>
            <Form onSubmit={handleSubmit(registerSubmit)}>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Username:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    {...register("name", { required: true, disabled: loading})}
                    type="text"
                    size="sm"
                    placeholder="enter your username"
                  />
                  <span className="text-danger">
                    <em>{errors?.name?.message}</em>
                  </span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    {...register("email", { required: true, disabled:loading})}
                    type="email"
                    size="sm"
                    placeholder="enter your email"
                  />
                  <span className="text-danger">
                    <em>{errors?.email?.message}</em>
                  </span>
                </Col>
              </Form.Group>


              {/* role here we've to use Form.Select bootstrap comp.
              for multiple selector we use plugins(react select)*/}
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Role</Form.Label>
               <Col sm={9}>
                <Select
                isDisabled={loading}
                 options={options}
                //   isMulti
                  onChange={(e)=>{
                    setValue("role",e)
                  }}
                  />
                {/* <Form.Select
                 size='sm'
                  {...register("role",{required:true})}
                //   multiple
                  >
                    <option value="">---Select Any One---</option>
                    <option value="seller">Seller</option>
                    <option value="customer">Customer</option>
                </Form.Select> */}
                
              <span className="text-danger">
                    <em>{errors?.role?.message}</em>
                  </span>
               </Col>
              </Form.Group>


              
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Image</Form.Label>
               <Col sm={7}>
               <Form.Control
                disabled={loading}
                  type="file"
                  size='sm'
                //   multiple
                  onChange={handleImageUpload}
                />
              <span className="text-danger">
                <em>{errors?.image?.message}</em>
                  </span>
               </Col>
               {/* image preview */}
               <Col sm={2}>
                {/* thumb is object and we made it URL to display using JS func */}
                <Image src={thumb?URL.createObjectURL(thumb):imageplaceholder} fluid alt=""/>
               </Col>
              </Form.Group>


              <Form.Group className="row mb-3">
                <Col sm={{ offset: 3, span: 9 }}>
                  <ButtonComponent
                    label="cancel"
                    className="btn-danger me-2"
                    type="reset"
                    loading={loading}
                  />
                  <ButtonComponent label="register"  loading={loading}/>
                </Col>
              </Form.Group>
            </Form>
            OR,&nbsp;
            <a href="/login">Already have an account? Login.</a>{" "}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
