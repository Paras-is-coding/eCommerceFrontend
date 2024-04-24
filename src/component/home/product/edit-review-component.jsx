import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const EditReviewForm = ({ defaultReview, defaultRate, onSubmit }) => {
  // State to track the edited review text and rating
  const [editedReviewText, setEditedReviewText] = useState(defaultReview);
  const [editedRating, setEditedRating] = useState(defaultRate);

  // Function to handle changes in the review text
  const handleReviewTextChange = (e) => {
    setEditedReviewText(e.target.value);
  };

  // Function to handle changes in the rating
  const handleRatingChange = (newRating) => {
    setEditedRating(newRating);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedReviewText, editedRating);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Edit Your Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={editedReviewText}
          onChange={handleReviewTextChange}
        />
        <div className="my-4">
          <span className="me-2">Rate this product:</span>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              color={index < editedRating ? '#ffc107' : '#e4e5e9'}
              className="cursor-pointer"
              onClick={() => handleRatingChange(index + 1)}
            />
          ))}
        </div>
        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form.Group>
    </Form>
  );
};

export default EditReviewForm;
