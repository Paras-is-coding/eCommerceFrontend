import React, { useCallback, useEffect, useState } from "react";
import {  Col, Container, Row, Spinner } from "react-bootstrap";
import {  useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { H4 } from "../../../component/common/heading/heading.component";
import categorySvc from "../../cms/category/category.service";
import ProductSingleGrid from "../../../component/home/product/product-singlegrid.component";

export default function CagetoryDetailPage() {
  const params = useParams();
  const [categoryDetail, setCategoryDetail] = useState();
  const [loading, setLoading] = useState(true);

  const getCategoryDetail = useCallback(async () => {
    try {
      let response = await categorySvc.getCategoryBySlug({ slug: params.slug });
      setCategoryDetail(response.data.result);
    } catch (error) {
      toast.error("Unable to find Category!");
    } finally {
      setLoading(false);
    }
  }, [params.slug]);
  useEffect(() => {
    getCategoryDetail();
  }, [params]);
  return (
    <>
      <Container className=" fluid my-4 bg-light">
        {loading ? (
          <Row>
            <Col>
              <Spinner />
            </Col>
          </Row>
        ) : categoryDetail ? (
          <>
            <Row>
              <Col className="text-center">
                <H4
                  value={`Category Detail of ${categoryDetail.detail.title}`}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              {categoryDetail.product &&
                categoryDetail.product.map((item, ind) => {
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
                Category does not exist!
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
