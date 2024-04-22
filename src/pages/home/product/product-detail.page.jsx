import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  Form,
  Carousel,
  Spinner,
} from "react-bootstrap";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";
import productSvc from "../../cms/product/product.service";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import cartSvc from "./cartService";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productSvc.getProductBySlug(slug);
        console.log(productData);
        setProduct(productData.result.product[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [slug]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      setLoading(true);
      await cartSvc.addToCart({ productId: product._id, qty: quantity });

      // Success
      Swal.fire({
        title: 'Item added to cart!',
        text: 'Do you want to view your cart?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/carts'); // Navigate to cart page
        }
      });

    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error: show error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {product ? (
        <Container>
          <Row className="my-4">
            <Col md={6}>
              <Carousel>
                {product.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={import.meta.env.VITE_IMAGE_URL + "product/" + image}
                      fluid
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0">
                <Card.Body className="gap-1">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.summary}</Card.Text>
                  <div>
                    <span className="text-muted">Brand:</span>{" "}
                    {product.brand.title}
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="my-4">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          color={
                            index < Math.floor(product.rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                        />
                      ))}
                    </div>
                    <span className="ms-2 text-muted">
                      <span className="me-1">{product.rating}</span>
                      <span>ratings</span>
                    </span>
                  </div>
                  <div className="h3">
                    {new Intl.NumberFormat("en-np", {
                      style: "currency",
                      currency: "npr",
                    }).format(product.afterDiscount)}
                  </div>
                  <Card.Text
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  <div className="d-flex align-items-center gap-5 ">
                    <span className="text-muted">Quantity</span>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="light"
                        className="me-3"
                        onClick={decreaseQuantity}
                      >
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type="text"
                        value={quantity}
                        readOnly
                        style={{ width: "50px", textAlign: "center" }}
                      />
                      <Button
                        variant="light"
                        className="ms-3"
                        onClick={increaseQuantity}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={addToCart}
                    disabled={loading}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Reviews Section */}
          <Row className="my-4">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Customer Reviews</Card.Title>
                  <Card.Text>No reviews available yet.</Card.Text>
                  {/* You can fetch and display reviews here */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProductDetailsPage;
