import React from "react";
import "./home.page.css";
import BannerComponent from "../../../component/home/banner/banner.component";

export default function HomePage(props) {
  return (
    <React.Fragment>
      {/* using vanilla bootstrap
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Home Page Title</h1>
        </div>
      </div>
    </div>

 using react bootstrap
   <Container>
      <Row>
        <Col sm={12} >
          <h1 className="text-center">Home Page Title1</h1>
        </Col>
      </Row>
   </Container> */}
      <BannerComponent />
    </React.Fragment>
  );
}
