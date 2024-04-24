import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BannerComponent from "../../../component/home/banner/banner.component";
import productSvc from "../../cms/product/product.service";
import ProductSingleGrid from "../../../component/home/product/product-singlegrid.component";
import { H4 } from "../../../component/common/heading/heading.component";
import Footer from "../../../component/home/footer/footer.component";
import categorySvc from "../../cms/category/category.service";
import CategoryCard from "../../../component/home/category/category-singlegrid-component";
import { toast } from "react-toastify";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCats, setLoadingCats] = useState(true);
  const [categs, setCategs] = useState([]);

  const getCategsList = useCallback(async () => {
    try {
      const res = await categorySvc.getCategoryForHome();
      setCategs(res?.data?.result);
    } catch (error) {
      toast.error("Categories do not exist!");
    } finally {
      setLoadingCats(false);
    }
  }, []);

  const getProductsForHome = useCallback(async () => {
    try {
      const response = await productSvc.getProductForHome({});
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
      <BannerComponent />

      {/* Showing various products */}
      <Container className={`fluid my-4 bg-light`}>
        {loading ? (
          <Row>
            <Col>
              <Spinner />
            </Col>
          </Row>
        ) : (
          <>
            <Row className="pt-4">
              <Col className="d-flex justify-content-between">
                <H4 value={`Products`} />
                <Link to={"/products"}>
                  <Button className="bg-warning border-white">Show More</Button>
                </Link>
              </Col>
            </Row>
            <Row className="mt-2">
              {products && products.map((item, ind) => (
                <ProductSingleGrid product={item} key={ind} />
              ))}
            </Row>
          </>
        )}
      </Container>

      {/* Showing various categories */}
      <Container className={`fluid my-4 bg-light`}>
        {loadingCats ? (
          <Row>
            <Col>
              <Spinner />
            </Col>
          </Row>
        ) : (
          <>
            <Row className="pt-4">
              <Col className="d-flex justify-content-between">
                <H4 value={`Categories`} />
                <Button className="bg-warning border-white">Show More</Button>
              </Col>
            </Row>
            <Row className="mt-2 ">
              {categs.map((item, ind) => (
                <CategoryCard category={item} key={ind} />
              ))}
            </Row>
          </>
        )}
      </Container>

      <Footer />
    </React.Fragment>
  );
}
