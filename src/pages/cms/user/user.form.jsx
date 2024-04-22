import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ErrorMessage } from "../../../component/common/validation-message/validation-message.component";
import { ButtonComponent } from "../../../component/common/button/button.component";
import userSvc from "./user.service";
import { useEffect, useState } from "react";
import { ImageUploader } from "../../../component/common/form/input.component";
import placeholder from "../../../assets/images/imageplaceholder.svg";

const UserForm = ({ submitEvent, loading = false, detail = null }) => {
  const [thumb, setThumb] = useState();

  const userSchema = Yup.object({
    name: Yup.string().min(2).required(),
    email: Yup.string().email().required(),
    status: Yup.string().oneOf(["active", "inactive"]).optional(),
    address: Yup.object({
      shipping: Yup.string().optional(),
      billing: Yup.string().optional(),
    }).optional(),
    role: Yup.string().oneOf(["admin", "seller", "customer"]).optional(),
    phone: Yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    // default values for edit, when detail prop comes
    if (detail) {
      // Set values for basic fields
      setValue("name", detail.name);
      setValue("email", detail.email);
      setValue("status", detail.status);
      setValue("role", detail.role);
      setValue("phone", detail.phone);

      // Set values for address fields if they exist
      if (detail.address) {
        setValue("addressShipping", detail.address.shipping || "");
        setValue("addressBilling", detail.address.billing || "");
      }

      if (detail.image) {
        setThumb(detail.image);
      }
    }
  }, [detail]);

  const submitForm = (data) => {
    const address = {
      shipping: data.addressShipping,
      billing: data.addressBilling,
    };

    delete data.addressShipping;
    delete data.addressBilling;

    // Combine all form data into one object
    const formData = { ...data, address };

    submitEvent(formData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Name: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              {...register("name")}
            />
            <ErrorMessage message={errors?.name?.message} />
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Email: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />
            <ErrorMessage message={errors?.email?.message} />
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Status: </Form.Label>
          <Col sm={9}>
            <Form.Select {...register("status")}>
              <option value="inactive">Inactive</option>

              <option value="active">Active</option>
            </Form.Select>
            <ErrorMessage message={errors?.status?.message} />
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Shipping Address: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="Enter Shipping Address"
              {...register("addressShipping")}
            />
            <ErrorMessage message={errors?.addressShipping?.message} />
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Billing Address: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="Enter Billing Address"
              {...register("addressBilling")}
            />
            <ErrorMessage message={errors?.addressBilling?.message} />
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Role: </Form.Label>
          <Col sm={9}>
            <Form.Select {...register("role")}>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="customer">Customer</option>
            </Form.Select>
            <ErrorMessage message={errors?.role?.message} />
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Phone: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              {...register("phone")}
            />
            <ErrorMessage message={errors?.phone?.message} />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Image: </Form.Label>
          <Col sm={7}>
            <ImageUploader
              setThumb={setThumb}
              setValue={setValue}
              setError={setError}
            />
            <ErrorMessage message={errors?.image?.message} />
          </Col>
          <Col sm={2}>
            <img
              src={
                thumb
                  ? typeof thumb === "string"
                    ? import.meta.env.VITE_IMAGE_URL + "user/" + thumb
                    : URL.createObjectURL(thumb)
                  : placeholder
              }
              alt=""
              className="img-fluid"
            />
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Col sm={{ offset: 3, span: 9 }}>
            <ButtonComponent
              label="Cancel"
              type="reset"
              className="btn-danger me-3"
              loading={loading}
            />
            <ButtonComponent
              label="Submit"
              type="submit"
              className="btn-success"
              loading={loading}
            />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default UserForm;
