import { Card, Container, Table, Pagination, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import categorySvc from "./category.service"
import TablePagination from "../../../component/common/pagination/pagination.component"

import Swal from 'sweetalert2'

const CategoryList = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState()


  // bhira lekhe paxi yo page dekhi ni function call garna milxa
  const listCategories = async ({page=1,search="", limit=10}) => {
    try {
      setLoading(true)
      const response = await categorySvc.categoryLists({page, search, limit})
      setData(response?.data?.result)
      console.log(data)
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
    // consuming list categorys api
      listCategories({page: 1})
  }, [])

  const handleDelete = async(id) => {
    try{
      setLoading(true)
      let response = await categorySvc.deleteById(id)
      toast.success("Category deleted Successfully")
      // reload component to reflect deleted data on view
      listCategories({page: 1})
    } catch(exception) {
      toast.error("Category cannot be deleted or already deleted.")
    } finally{
      setLoading(false)
    }
  }

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Category List"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Category List", link: null}
          ]}/>
          <Card className="mb-4">

            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Category List"}></Heading>
              <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/category/create">
                <i className="fa fa-plus"></i>&nbsp;Add Category
              </NavLink>
            </Card.Header>

            <Card.Body>
              <Table size="sm" bordered hover striped>
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Parent</th>
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
                    
                      data ? <>
                        {
                          data.map((row, ind) => (
                            <tr key={ind}>
                              <td>{row.title}</td>
                              <td>
                                {row.description}
                              </td>
                              <td>
                                {
                                  row.parentId ? row.parentId.slug:"-"
                                }
                              </td>
                              <td>
                                {/* better to send image url from backend */}
                                <Image onError={(e) => {
                                  e.target.src="https://png.pngtree.com/png-clipart/20220419/ourmid/pngtree-azul-category-png-png-image_4548281.png"
                                }} style={{maxWidth: "50px"}} fluid src={import.meta.env.VITE_IMAGE_URL+'category/'+row.image} />
                              </td>
                              <td>
                                <Badge bg={`${row.status === 'active'? 'success' : 'danger'}`}>
                                  {row.status}
                                </Badge>
                              </td>
                              <td>
                                <NavLink to={'/admin/category/'+row._id} className={"btn btn-sm btn-warning rounded-circle me-1"}>
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
                                }} to={'/admin/category/'+row._id} className={"btn btn-sm btn-danger rounded-circle me-1"}>
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
                dataFetch={listCategories}
              />

            </Card.Body>
              
          </Card>
        </Container>
        
    </>)
}
export default CategoryList