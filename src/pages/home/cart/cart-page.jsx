import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cartSvc from '../product/cartService';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await cartSvc.listCart();
        setCartItems(response.data.result); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await cartSvc.deleteCartItem(itemId);
      // Remove the deleted item from the cartItems state
      setCartItems(cartItems.filter(item => item._id !== itemId));
      Swal.fire('Success', 'Item removed from cart', 'success');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      Swal.fire('Error', 'Failed to remove item from cart', 'error');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={import.meta.env.VITE_IMAGE_URL + 'product/' + item.detail.image}
                      alt={item.detail.title}
                      width={50}
                      height={50}
                      onClick={() => handleProductClick(item.productId.slug)}
                      style={{ cursor: 'pointer', marginRight: '10px' }}
                    />
                    <span
                      onClick={() => handleProductClick(item.productId.slug)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.detail.title}
                    </span>
                  </div>
                </td>
                <td> {new Intl.NumberFormat("en-np", {
                      style: "currency",
                      currency: "npr",
                    }).format(item.rate)}</td>
                <td>{item.qty}</td>
                <td> {new Intl.NumberFormat("en-np", {
                      style: "currency",
                      currency: "npr",
                    }).format(item.amount)}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item._id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!loading && cartItems.length === 0 && <p>Your cart is empty</p>}
      <div className="d-flex justify-content-end">
        <h4>Total:  
        {new Intl.NumberFormat("en-np", {
                      style: "currency",
                      currency: "npr",
                    }).format(cartItems.reduce((total, item) => total + item.amount, 0))}
        </h4>
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="primary">Checkout</Button>
      </div>
    </Container>
  );
};

export default CartPage;
