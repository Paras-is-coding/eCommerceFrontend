import React from "react";
import { Card, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function ProductSingleGrid({product}) {
  return (
    <>
      <Col sm={6} md={4} lg={3}>
        <Card>
          <Card.Img
            style={{ aspectRatio: "3/2", objectFit: "contain" }}
            className="mt-2"
            variant="top"
            src={
              import.meta.env.VITE_IMAGE_URL + "product/" + product.images[0]
            }
          />
          <Card.Body as={"div"}>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.summary}</Card.Text>
            <p>
              {new Intl.NumberFormat("en-np", {
                style: "currency",
                currency: "npr",
              }).format(product.afterDiscount)}
            </p>
            <NavLink
              to={"/product/" + product.slug}
              className={"btn btn-sm btn-warning"}
            >
              View Details
            </NavLink>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
