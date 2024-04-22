import React, { useCallback, useContext, useEffect, useState } from "react";
import "./home.page.css";
import BannerComponent from "../../../component/home/banner/banner.component";
import productSvc from "../../cms/product/product.service";
import ProductSingleGrid from "../../../component/home/product/product-singlegrid.component";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { H4 } from "../../../component/common/heading/heading.component";
import Footer from "../../../component/home/footer/footer.component";
import categorySvc from "../../cms/category/category.service";
import { toast } from "react-toastify";
import CategoryCard from "../../../component/home/category/category-singlegrid-component";
import { Link } from "react-router-dom";
// import { ThemeContext } from "../../../config/theme.context";

export default function HomePage(props) {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingCats, setLoadingCats] = useState(true);
  // const {theme} = useContext(ThemeContext);
  const [categs, setCategs] = useState();


  const getCategsList = useCallback(async () => {
    try {
      let res = await categorySvc.getCategoryForHome();
      setCategs(res?.data?.result);
    } catch (error) {
      toast.error("Categories does not exist!");
    }finally{
      setLoadingCats(false);
    }
  }, []);

  const getProductsForHome = useCallback(async () => {
    try {
      let response = await productSvc.getProductForHome();
      setProducts(response.data.result);
    } catch (error) {
      toast.error("Unable to fetch products!");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    getProductsForHome();
    getCategsList();
  }, []);



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
      <BannerComponent/>



{/* showing various products */}
      <Container className={`fluid my-4 bg-light`}>
        {loading ? (
          <Row>
            <Col>
              <Spinner />
            </Col>
          </Row>
        ) : products ? (
          <>
            <Row className="pt-4">
              <Col className="d-flex justify-content-between">
                <H4
                  value={`Products`}
                />
                <Link
                to={'/products'}
                >
                <Button className="bg-warning border-white">Show More</Button>
                </Link>
              </Col>
            </Row>
            <Row className="mt-2">
              {products &&
                products.map((item, ind) => {
                  return(
                 <ProductSingleGrid product={item} key={ind}/>
                );
                })}
            </Row>
          </>
        ) : (
          <Row>
            <Col>
              <p className="text-danger text-center">
                No products available!
              </p>
            </Col>
          </Row>
        )}
      </Container>


{/* showing various categories */}
      <Container className={`fluid my-4 bg-light`}>
        {loadingCats ? (
          <Row>
            <Col>
              <Spinner />
            </Col>
          </Row>
        ) : products ? (
          <>
            <Row className="pt-4">
              <Col className="d-flex justify-content-between">
                <H4
                  value={`Categories`}
                />
                <Button className="bg-warning border-white">Show More</Button>
              </Col>
            </Row>
            <Row className="mt-2 ">
              {categs &&
                categs.map((item, ind) => {
                  return(
                 <CategoryCard category={item} key={ind}/>
                );
                })}
            </Row>
          </>
        ) : (
          <Row>
            <Col>
              <p className="text-danger text-center">
                No categories available!
              </p>
            </Col>
          </Row>
        )}
      </Container>


      <Footer/>


    </React.Fragment>
  );
}
