import { Container, Card, Spinner } from "react-bootstrap";
import { Heading } from "../../../component/common/heading/heading.component";
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productSvc from "./product.service";
import { toast } from "react-toastify";
import ProductForm from "./product.form";

const ProductEdit = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [detail, setDetail] = useState();
  const [currentId, setCurrentId] = useState(null); // Track the current ID

  const editProduct = async (data) => {
    try {
      setLoading(true);
      let response = await productSvc.updateProduct(params.id, data);
      toast.success("Product updated successfully.");
      navigate("/admin/product");
    } catch (exception) {
      toast.error("Product cannot be editd at this moment.");
      console.log(exception);
    } finally {
      setLoading(false);
    }
  };

  const getById = async () => {
    try {
      setLoading(true);
      const response = await productSvc.getProductById(currentId);
      console.log(response.data.result);

    //   mapped API data in format that is used to render to edit form component
      setDetail({
        title: response?.data?.result.title,
        summary: response?.data?.result.summary,
        description: response?.data?.result.description,
        category: response?.data?.result.category.map((cat) => ({
          label: cat.title,
          value: cat._id,
        })),
        brand: {
          label: response?.data?.result.brand.title,
          value: response?.data?.result.brand._id,
        },
        price: response?.data?.result.price,
        discount: response?.data?.result.discount,
        tags: response?.data?.result.tags.map((tag, ind) => ({
          label: tag,
          value: tag,
          __isNew__: false,
        })),
        sellerId: response?.data?.result.sellerId._id,
        attributes: response?.data?.result.attributes.map((attribute) => ({
          key: attribute.key,
          value: attribute.value.map((val) => ({
            label: val,
            value: val,
            __isNew__: false,
          })),
        })),
        status: response?.data?.result.status,
        images: response?.data?.result.images,
      });
    } catch (exception) {
      console.log(exception);
      toast.error("Product cannot be fetched at this moment");
      navigate("/admin/product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Update currentId when params.id changes
    setCurrentId(params.id);
  }, [params.id]);

  useEffect(() => {
    if (currentId !== null) {
      getById();
    }
  }, [currentId]);

  return (
    <>
      <Container fluid className="px-4">
        <Heading type={"h1"} className="mt-4" value={"Product Edit"}></Heading>
        <Breadcrumb
          data={[
            { title: "Dashboard", link: "/admin" },
            { title: "Product List", link: "/admin/product" },
            { title: "Product Edit", link: null },
          ]}
        />
        <Card className="mb-4">
          <Card.Header>
            <Heading
              type={"h4"}
              className={"float-start"}
              value={"Product Edit Form"}
            ></Heading>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <>
                <Spinner variant="dark" />
              </>
            ) : (
              <ProductForm
                submitEvent={editProduct}
                loading={loading}
                detail={detail}
              />
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ProductEdit;
