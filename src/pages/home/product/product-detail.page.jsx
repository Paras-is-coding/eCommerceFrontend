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
import { FaPlus, FaMinus, FaStar, FaEdit } from "react-icons/fa";
import productSvc from "../../cms/product/product.service";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import cartSvc from "./cartService";
import EditReviewForm from "../../../component/home/product/edit-review-component";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [userReview, setUserReview] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productSvc.getProductBySlug(slug);
        console.log(productData);
        setProduct(productData.result.product[0]);

        const productReviews = await productSvc.getAllReviews(
          productData.result.product[0]._id
        );
        setReviews(productReviews.data.reviews);

        // Calculate average rating
        const totalRating = productReviews.data.reviews.reduce(
          (acc, review) => acc + review.rate,
          0
        );
        const avgRating =
          productReviews.data.reviews.length > 0
            ? totalRating / productReviews.data.reviews.length
            : 0;
        setAverageRating(avgRating);

        // Check if the logged-in user has already reviewed the product
        const loggedInUser = JSON.parse(localStorage.getItem("_user"));
        const userReview = productReviews.data.reviews.find(
          (review) => review.reviewerId === loggedInUser.userId
        );
        setUserReview(userReview);
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
        title: "Item added to cart!",
        text: "Do you want to view your cart?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/carts"); // Navigate to cart page
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitReview = async () => {
    try {
      await productSvc.createReview({
        productId: product._id,
        reviewData:{
          review: reviewText,
          rate: rating
        }
       
      });

      // Refresh reviews after adding a new review
      const productReviews = await productSvc.getAllReviews(product._id);
      setReviews(productReviews.data.reviews);

      // Reset review text and rating
      setReviewText("");
      setRating(5); // Reset rating to default value

      // Success message
      Swal.fire({
        icon: "success",
        title: "Review submitted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Function to handle edit review submission
  const handleEditReviewSubmit = async (editedReviewText, editedRating) => {
    try {
      console.log(editedReviewText)
      console.log(editedRating)
      console.log(product._id)
      console.log(userReview._id)
      await productSvc.updateReview({
        productId: product._id,
        reviewId: userReview._id,
        reviewData: {
          review: editedReviewText,
          rate: editedRating,
        },
      });

      // Refresh reviews after editing
      const productReviews = await productSvc.getAllReviews(product._id);
      setReviews(productReviews.data.reviews);

      // Close edit mode after successful edit
      setEditMode(false);

      // Success message
      Swal.fire({
        icon: "success",
        title: "Review updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating review:", error);
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
                            index < Math.floor(averageRating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                        />
                      ))}
                    </div>
                    <span className="ms-2 text-muted">
                      <span>{reviews.length+ " "}{reviews.length === 1?"review":"reviews"}</span>
                    </span>
                  </div>
                  <div className="h3">
                    {new Intl.NumberFormat("en-np", {
                      style: "currency",
                      currency: "npr",
                    }).format(product.afterDiscount)}
                  </div>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
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
                  {/* Show review form if the user hasn't reviewed yet */}
                  {!userReview && (
                    <Form.Group className="mb-3">
                      <Form.Label>Add Your Review</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={reviewText}
                        onChange={handleReviewTextChange}
                      />
                      <div className="my-4">
                        <span className="me-2">Rate this product:</span>
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            color={index < rating ? "#ffc107" : "#e4e5e9"}
                            className="cursor-pointer"
                            onClick={() => handleRatingChange(index + 1)}
                          />
                        ))}
                      </div>
                      <Button
                        variant="primary"
                        className="mt-3"
                        onClick={submitReview}
                      >
                        Submit Review
                      </Button>
                    </Form.Group>
                  )}

                  {/* Iterate over reviews */}
                  {reviews && reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={index}>
                        {/* Display review */}
                        <p>{review.review}</p>
                        {/* Display rating */}
                        <div>
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              color={
                                index < Math.floor(review.rate)
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                            />
                          ))}
                        </div>
                        {/* Show edit option if the review is by logged-in user */}
                        {userReview && userReview._id === review._id && (
                          <Button
                            variant="link"
                            className="text-primary"
                            onClick={toggleEditMode}
                          >
                            <FaEdit /> Edit Review
                          </Button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No reviews available yet.</p>
                  )}

                  {editMode && (
                    <EditReviewForm
                      defaultReview={userReview.review}
                      defaultRate={userReview.rate}
                      onSubmit={handleEditReviewSubmit}
                    />
                  )}
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
