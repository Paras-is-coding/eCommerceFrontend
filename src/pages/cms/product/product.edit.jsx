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

  const [product,setProduct] = useState();

  const editProduct = async (data) => {
    try {
      setLoading(true);
      console.log("ud",data)
      // let response = await productSvc.updateProduct(params.id, data);
      toast.success("Product updated successfully.");
      // navigate("/admin/product");
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
      if (response.data.result[0]) {
        setProduct(response.data.result[0]); // Set product state only if data exists
        setDetail({
          title: response.data.result[0].title,
          summary: response.data.result[0].summary,
          description: response.data.result[0].description,
          category: response.data.result[0].category && response.data.result[0].category?.map((cat) => ({
            label: cat.title,
            value: cat._id,
          })),
          brand: {
            label: response.data.result[0].brand && response.data.result[0].brand.title,
            value: response.data.result[0].brand && response.data.result[0].brand._id,
          },
          price: response.data.result[0].price,
          discount: response.data.result[0].discount,
          tags: response.data.result[0].tags && response.data.result[0].tags.map((tag, ind) => ({
            label: tag,
            value: tag,
            __isNew__: false,
          })),
          sellerId: response.data.result[0].sellerId._id,
          attributes: response.data.result[0].attributes && response.data.result[0].attributes?.map((attribute) => ({
            key: attribute.key,
            value: attribute.value.map((val) => ({
              label: val,
              value: val,
              __isNew__: false,
            })),
          })),
          status: response.data.result[0].status,
          images: response.data.result[0].images,
        });
      } else {
        // Handle case where data doesn't exist
        toast.error("Product not found.");
        navigate("/admin/product");
      }
    } catch (exception) {
      console.log(exception);
      toast.error("Product cannot be fetched at this moment");
      // navigate("/admin/product");
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
