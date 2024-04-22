import React, { useCallback, useEffect, useState } from "react";
import {  Col, Container, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { H4 } from "../../../component/common/heading/heading.component";
import ProductSingleGrid from "../../../component/home/product/product-singlegrid.component";
import productSvc from "../../cms/product/product.service";

export default function ProductsPage() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const getProductsForHome = useCallback(async () => {
    try {
      let response = await productSvc.getProductForHome();
      setProducts(response.data.result);
      console.log(response.data.result)
    } catch (error) {
      toast.error("Error fetching products!");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getProductsForHome();
  }, []);
  return (
    <>
      <Container className=" fluid my-4 bg-light">
        {loading ? (
          <Row>
            <Col>
              <Spinner />
            </Col>
          </Row>
        ) : products ? (
          <>
            <Row>
              <Col className="text-center">
                <H4
                  value={`Our Products`}
                />
              </Col>
            </Row>
            <Row className="mt-4">
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
                Unable to fetch products at the moment!
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
