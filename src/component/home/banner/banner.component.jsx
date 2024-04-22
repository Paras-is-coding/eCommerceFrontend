import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import bannerSvc from "../../../pages/cms/banner/banner.service";
import { toast } from "react-toastify";

export default function BannerComponent() {
  const [banner,setBanner] = useState();

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getListOfHomeBanners = useCallback(async()=>{
    try {
      const response = await bannerSvc.getBannerForHome();
      if(response.data.result){
        setBanner(response.data.result);
      }
      
    } catch (error) {
      toast.error("Error fetching banner list!")
    }
  },[]);
  useEffect(()=>{
    getListOfHomeBanners();
  },[]);
console.log(banner)
  return (
    <React.Fragment>
      <Container className="mt-2 bg">
        <Row>
          <Col sm={12}>
            <Slider autoplay  {...settings}>
             {
              banner && banner.map((bnr,ind)=>(
                <div key={ind}>
              <a href={bnr.url} target="_banner">
              <img onError={(e)=>{
                e.target.src="https://dummyimage.com/1200x400/c2c0c2/8b8c91&text=No+Banner+Image+"
               }} src={import.meta.env.VITE_IMAGE_URL+"banner/"+bnr.image} className="img img-fluid"/>
              </a>
                </div>
              ))
             }
            </Slider>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
