import React from 'react'
import { Col, Form } from 'react-bootstrap';
import {ButtonComponent} from '../../common/button/button.component';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function SetPasswordComponent(submitEvent) {

    const yupSchema =  yup.object({
        password: yup
          .string()
          .required('Password is required')
          .matches(
            /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
            'Password must meet the specified criteria.'
          ),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords do not match!')
          .required('Confirm Password is required'),
      });

       // react-hook-form implementation
   const {register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(yupSchema)
   });

  return (
    <Form onSubmit={handleSubmit(submitEvent)}>

    <Form.Group className="row mb-3">
        <Form.Label className='col-sm-3'>Username:</Form.Label>
        <Col sm={9}>
            <Form.Control
            {...register("password",{required:true})}
            type='password'
            size='sm'
            placeholder='enter new password'
            />
            <span className='text-danger'>
                <em>{errors?.password?.message}</em>
            </span>
        </Col>
    </Form.Group>
    <Form.Group className="row mb-3">
        <Form.Label className='col-sm-3'>Confirm Password:</Form.Label>
        <Col sm={9}>
            <Form.Control
            {...register("confirmPassword",{required:true})}
            type='password'
            size='sm'
            placeholder='re-enter new password'
            />
            <span className='text-danger'>
                <em>{errors?.confirmPassword?.message}</em>
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
  )
}
