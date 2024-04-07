import { Card, Container, Table, Pagination, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import productSvc from "./product.service"
import TablePagination from "../../../component/common/pagination/pagination.component"

import Swal from 'sweetalert2'

const ProductList = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState()


  // bhira lekhe paxi yo page dekhi ni function call garna milxa
  const listProducts = async ({page=1,search="", limit=10}) => {
    try {
      setLoading(true)
      const response = await productSvc.productLists({page, search, limit})
      setData(response?.data?.result)
      setPagination({
        ...response.data.meta,
        pages: (Math.ceil(response?.data?.meta?.total/response?.data?.meta?.limit))
      })
    } catch(exception) {
      console.log("Some error occured: ",exception)
      toast.error(exception?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // consuming list products api
      listProducts({page: 1})
  }, [])

  const handleDelete = async(id) => {
    try{
      setLoading(true)
      let response = await productSvc.deleteById(id)
      toast.success("Product deleted Successfully")
      // reload component to reflect deleted data on view
      listProducts({page: 1})
    } catch(exception) {
      toast.error("Product cannot be deleted or already deleted.")
    } finally{
      setLoading(false)
    }
  }

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Product List"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Product List", link: null}
          ]}/>
          <Card className="mb-4">

            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Product List"}></Heading>
              <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/product/create">
                <i className="fa fa-plus"></i>&nbsp;Add Product
              </NavLink>
            </Card.Header>

            <Card.Body>
              <Table size="sm" bordered hover striped>
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    loading ? <tr>
                      {/* data na vako bela */}
                    <td colSpan={5}  className="text-center">
                      <Spinner variant="dark"></Spinner>
                    </td>
                  </tr> : (
                    
                      data && data.length ? <>
                        {
                          data.map((row, ind) => (
                            <tr key={ind}>
                              <td>{row.title}</td>
                              <td dangerouslySetInnerHTML={{__html:row.description}}>
                              </td>
                              <td>
                                {/* better to send image url from backend */}
                                <Image onError={(e) => {
                                  e.target.src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                }} style={{maxWidth: "50px"}} fluid src={import.meta.env.VITE_IMAGE_URL+'product/'+row.images[0]} />
                              </td>
                              <td>
                                <Badge bg={`${row.status === 'active'? 'success' : 'danger'}`}>
                                  {row.status}
                                </Badge>
                              </td>
                              <td>
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
                        }
                      </> : <tr>
                      <td colSpan={5}  className="text-center">
                        No data found
                      </td>
                    </tr>                    
                  )
                  }
                </tbody>
              </Table>
              
              <TablePagination 
                pagination={pagination}
                dataFetch={listProducts}
              />

            </Card.Body>
              
          </Card>
        </Container>
        
    </>)
}
export default ProductList