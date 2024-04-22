import React from "react";
import { Card, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Col sm={6} md={4} lg={3}>
      <Card>
        <Card.Img
          onError={(e) => {
            e.target.src =
              "https://dummyimage.com/600x400/e3e0e3/a1a1a1&text=No+Image";
          }}
          style={{ aspectRatio: "3/2", objectFit: "contain" }}
          className="mt-2"
          variant="top"
          src={import.meta.env.VITE_IMAGE_URL+"category/"+category.image} 
        />
        <Card.Body as={"div"}>
          <Card.Title>{category.title}</Card.Title>
          <NavLink
            to={"/category/" + category.slug} // Assuming category object has a 'slug' property
            className={"btn btn-sm btn-warning"}
          >
            View Category
          </NavLink>
        </Card.Body>
      </Card>
    </Col>
  );
}
