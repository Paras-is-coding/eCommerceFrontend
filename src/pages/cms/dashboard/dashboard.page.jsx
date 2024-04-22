import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {  FiBox,  FiUsers } from 'react-icons/fi';
import {  BiUser } from 'react-icons/bi';
import { GiShoppingCart, GiCash } from 'react-icons/gi';
import userSvc from '../user/user.service';
import productSvc from '../product/product.service';
import cartSvc from '../../home/product/cartService';

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);



  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data for statistics
        const usersResponse = await userSvc.listAllUsers({});
        setTotalUsers(usersResponse.data.meta.total);

        const productsResponse = await productSvc.productLists({});
        setTotalProducts(productsResponse.data.meta.total);

        const ordersResponse = await cartSvc.listOrder();
        setTotalOrders(ordersResponse.data.meta.total);

        // const salesResponse = await 
        // setTotalSales(salesResponse.data.totalSales);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <Container fluid className="px-4">
      <h1 className="mt-4">Admin Dashboard</h1>
      <p className="text-muted mb-4">Welcome back, Admin! Here's an overview of your store's performance.</p>

      <Row className="mb-4">
      <Col lg={3} md={6}>
          <StatCard
            icon={<FiUsers />}
            title="Total Users"
            value={totalUsers}
          />
        </Col>


        <Col lg={3} md={6}>
          <StatCard
            icon={<FiBox />}
            title="Total Products"
            value={totalProducts}
          />
        </Col>

        <Col lg={3} md={6}>
          <StatCard
            icon={<GiShoppingCart />}
            title="Total Orders"
            value={totalOrders}
          />
        </Col>

        <Col lg={3} md={6}>
          <StatCard
            icon={<GiCash />}
            title="Total Sales"
            value={`NPR ${totalSales}`}
          />
        </Col>

      </Row>

      <Row className="mb-4">
       
        <Col lg={3} md={6}>
          <FeatureCard
            icon={<BiUser />}
            title="Manage Users"
            description="Manage user accounts, permissions, and roles."
          />
        </Col>
        <Col lg={3} md={6}>
          <FeatureCard
            icon={<GiShoppingCart />}
            title="Manage Orders"
            description="Process and track customer orders efficiently."
          />
        </Col>
     
      </Row>


    </Container>
  );
}

const StatCard = ({ icon, title, value }) => (
  <Card className="shadow-sm mb-4">
    <Card.Body>
      <div className="d-flex align-items-center">
        <div className="icon bg-primary text-white rounded-circle">{icon}</div>
        <div className="ms-3">
          <h6 className="mb-0">{title}</h6>
          <p className="mb-0 text-muted">{value}</p>
        </div>
      </div>
    </Card.Body>
  </Card>
);

const FeatureCard = ({ icon, title, description }) => (
  <Card className="shadow-sm mb-4">
    <Card.Body>
      <div className="d-flex align-items-center">
        <div className="icon bg-secondary text-white rounded-circle">{icon}</div>
        <div className="ms-3">
          <h6 className="mb-0">{title}</h6>
          <p className="mb-0 text-muted">{description}</p>
        </div>
      </div>
    </Card.Body>
  </Card>
);
