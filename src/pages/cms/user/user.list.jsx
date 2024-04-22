import { Card, Container, Table, Pagination, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import userSvc from "./user.service" // Import user service
import TablePagination from "../../../component/common/pagination/pagination.component"

import Swal from 'sweetalert2'

const UserList = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState()

  // Function to fetch user data
  const listUsers = async ({page = 1, search = "", limit = 10}) => {
    try {
      setLoading(true)
      const response = await userSvc.listAllUsers({page, search, limit}) // Call user service method
      setData(response?.data?.result)
      console.log(response?.data?.result)
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
    // Fetch user data when component mounts
    listUsers({page: 1})
  }, [])

  // Function to handle user deletion
  const handleDelete = async(id) => {
    try{
      setLoading(true)
      let response = await userSvc.deleteUserById(id) // Call user service method
      toast.success("User deleted Successfully")
      // Reload component to reflect deleted data on view
      listUsers({page: 1})
    } catch(exception) {
      toast.error("User cannot be deleted or already deleted.")
    } finally{
      setLoading(false)
    }
  }

  return (
    <Container fluid className="px-4">
      <Heading type={"h1"} className="mt-4" value={"User List"} />
      <Breadcrumb data={[
        {title: "Dashboard", link: "/admin"},
        {title: "User List", link: null}
      ]}/>
      <Card className="mb-4">
        <Card.Header>
          <Heading type={"h4"} className={"float-start"} value={"User List"} />
          <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/user/create">
            <i className="fa fa-plus"></i>&nbsp;Add User
          </NavLink>
        </Card.Header>
        <Card.Body>
          <Table size="sm" bordered hover striped>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Shipping Address</th>
                <th>Billing Address</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center">
                    <Spinner variant="dark" />
                  </td>
                </tr>
              ) : (
                data ? (
                  <>
                    {data.map((row, ind) => (
                      <tr key={ind}>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>
                          <Badge bg={`${row.status === 'active'? 'success' : 'danger'}`}>
                            {row.status}
                          </Badge>
                        </td>
                        <td>{row.role}</td>
                        <td>{row.phone ?? "-"}</td>
                        <td>{row.address?.shipping ?? "-"}</td>
                        <td>{row.address?.billing ?? "-"}</td>
                        <td>
                          <Image
                            onError={(e) => {
                              e.target.src="https://example.com/default-image.jpg"
                            }}
                            style={{maxWidth: "50px"}}
                            fluid
                            src={import.meta.env.VITE_IMAGE_URL+'user/'+row.image} // api for user image
                          />
                        </td>
                        <td>
                          <NavLink to={'/admin/user/'+row._id} className={"btn btn-sm btn-warning rounded-circle me-1"}>
                            <i className="fa fa-pen text-white"></i>
                          </NavLink>
                          <NavLink
                            onClick={(e) => {
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
                            }}
                            to={'/admin/user/'+row._id}
                            className={"btn btn-sm btn-danger rounded-circle me-1"}
                          >
                            <i className="fa fa-trash text-white"></i>
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={9}  className="text-center">
                      No data found
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <TablePagination 
            pagination={pagination}
            dataFetch={listUsers}
          />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default UserList;
