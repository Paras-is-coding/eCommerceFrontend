import { Card, Container, Table, Pagination, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import productSvc from "./product.service"
import TablePagination from "../../../component/common/pagination/pagination.component"

import Swal from 'sweetalert2'
import categorySvc from "../category/category.service"
import brandSvc from "../brand/brand.service"
import userSvc from "../user/user.service"

const ProductList = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState()

  // Change catNames state to an object instead of an array
  const [catNames, setCatNames] = useState({});
  const [brandNames, setBrandNames] = useState({});
  const [sellerNames, setSellerNames] = useState({});

  // Function to fetch category names by ID
  const fetchCategoryNames = async (id) => {
    try {
      const category = await categorySvc.getCategoryById(id); 
      const categoryName = category.data.result.title;
      
      // Update catNames object with category name
      setCatNames(prevState => ({
        ...prevState,
        [id]: categoryName
      }));
    } catch (error) {
      // console.error("Error fetching category names:", error);
      // Handle error by setting category name to "-"
      setCatNames(prevState => ({
        ...prevState,
        [id]: "-"
      }));
    }
  };
  // Function to fetch brand names by ID
  const fetchBrandNames = async (id) => {
    try {
      const brand = await brandSvc.getBrandById(id); 
      const brandName = brand.data.result.title;
      
      // Update catNames object with category name
      setBrandNames(prevState => ({
        ...prevState,
        [id]: brandName
      }));
    } catch (error) {
      // console.error("Error fetching brand names:", error);
      // Handle error by setting category name to "-"
      setBrandNames(prevState => ({
        ...prevState,
        [id]: "-"
      }));
    }
  };
  // Function to fetch seller names by ID
  const fetchSellerNames = async (id) => {
    try {
      const seller = await userSvc.getUserById(id); 
      console.log(seller)
      const userName = seller.data.result.name;
      
      // Update catNames object with category name
      setSellerNames(prevState => ({
        ...prevState,
        [id]: userName
      }));
    } catch (error) {
      // console.error("Error fetching brand names:", error);
      // Handle error by setting category name to "-"
      setSellerNames(prevState => ({
        ...prevState,
        [id]: "-"
      }));
    }
  };

  // Function to list products
  const listProducts = async ({page=1,search="", limit=10}) => {
    try {
      setLoading(true)
      const response = await productSvc.productLists({page, search, limit})
      setData(response?.data?.result)

      // Iterate through each product and fetch category names
      response.data.result.forEach(async (row) => {
        row.category && row.category.forEach(async (cat) => {
          await fetchCategoryNames(cat);
        })
      })
      // console.log(catNames)

      // Iterate through each product and fetch brand names
      response.data.result.forEach(async (row) => {
        row.brand && 
          await fetchBrandNames(row.brand);
        
      })
      response.data.result.forEach(async (row) => {
        row.sellerId && 
          await fetchSellerNames(row.sellerId);
        
      })
     
      console.log(data)
      setPagination({
        ...response.data.meta,
        pages: Math.ceil(response?.data?.meta?.total / response?.data?.meta?.limit)
      })
    } catch(exception) {
      console.log("Some error occurred: ", exception)
      toast.error(exception?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch products when component mounts
    listProducts({page: 1})
  }, [])

  // Function to handle product deletion
  const handleDelete = async(id) => {
    try {
      setLoading(true)
      let response = await productSvc.deleteById(id)
      toast.success("Product deleted successfully")
      // Reload component to reflect deleted data on view
      listProducts({page: 1})
    } catch(exception) {
      console.log(exception,"exxx")
      toast.error("Product cannot be deleted or already deleted.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid className="px-4">
      <Heading type={"h1"} className="mt-4" value={"Product List"} />
      <Breadcrumb data={[
        { title: "Dashboard", link: "/admin" },
        { title: "Product List", link: null }
      ]}/>
      <Card className="mb-4">
        <Card.Header>
          <Heading type={"h4"} className={"float-start"} value={"Product List"} />
          <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/product/create">
            <i className="fa fa-plus"></i>&nbsp;Add Product
          </NavLink>
        </Card.Header>
        <Card.Body>
          <Table size="sm" bordered hover striped responsive>
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Summary</th>
                <th>Description</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Tags</th>
                <th>Seller</th>
                <th>Attributes</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <Spinner variant="dark" />
                  </td>
                </tr>
              ) : (
                data && data.length ? (
                  data.map((row, ind) => (
                    <tr key={ind}>
                      <td>{row.title}</td>
                      <td>{row.summary}</td>
                      <td dangerouslySetInnerHTML={{__html:row.description}}></td>
                      {/* Access category name from catNames object */}
                      <td>{catNames[row?.category] || "-"}</td>
                      <td>{brandNames[row?.brand] || "-"}</td>
                      {/* <td>{row.brand || "-"}</td> */}
                      <td>{row.price}</td>
                      <td>{row.discount}</td>
                      {/* <td>{row.tags}</td> */}
                      <td>{row.tags.map((tag)=>(`${tag},`))}</td>

                      {/* <td>{row.sellerId}</td> */}
                      <td>{sellerNames[row?.sellerId] || "-"}</td>
                      <td>{row.attributes.map((att)=>(`[${att.key}:${att.value}],`))}</td>


                      <td>
                        <Image onError={(e) => {
                          e.target.src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                        }} style={{maxWidth: "50px"}} fluid src={import.meta.env.VITE_IMAGE_URL+'product/'+row.images[0]} />
                      </td>
                      <td>
                        <Badge bg={`${row.status === 'active'? 'success' : 'danger'}`}>
                          {row.status}
                        </Badge>
                      </td>
                      <td >
                        <NavLink to={'/admin/product/'+row._id} className={"btn btn-sm btn-warning rounded-circle me-1"}>
                          <i className="fa fa-pen text-white"></i>
                        </NavLink>
                        <NavLink onClick={(e) => {
                          e.preventDefault()
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete(row._id)
                            }
                          })
                        }} to={'/admin/product/'+row._id} className={"btn btn-sm btn-danger rounded-circle me-1"}>
                          <i className="fa fa-trash text-white"></i>
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No data found
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <TablePagination pagination={pagination} dataFetch={listProducts} />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProductList;
