import { Card, Container, Table, Pagination, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import bannerSvc from "./banner.service"
import TablePagination from "../../../component/common/pagination/pagination.component"

import Swal from 'sweetalert2'

const BannerList = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState()


  // bhira lekhe paxi yo page dekhi ni function call garna milxa
  const listBanners = async ({page=1,search="", limit=10}) => {
    try {
      setLoading(true)
      const response = await bannerSvc.bannerLists({page, search, limit})
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
    // consuming list banners api
      listBanners({page: 1})
  }, [])

  const handleDelete = async(id) => {
    try{
      setLoading(true)
      let response = await bannerSvc.deleteById(id)
      toast.success("Banner deleted Successfully")
      // reload component to reflect deleted data on view
      listBanners({page: 1})
    } catch(exception) {
      toast.error("Banner cannot be deleted or already deleted.")
    } finally{
      setLoading(false)
    }
  }
 

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Banner List"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Banner List", link: null}
          ]}/>
          <Card className="mb-4">

            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Banner List"}></Heading>
              <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/banner/create">
                <i className="fa fa-plus"></i>&nbsp;Add Banner
              </NavLink>
            </Card.Header>

            <Card.Body>
              <Table size="sm" bordered hover striped>
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Link</th>
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
                                {/* open urls on different tab with target */}
                                <a target="_banner" href={row.url}>
                                  {row.url}
                                </a>
                              </td> 
                              <td>
                                {/* better to send image url from backend */}
                                <Image onError={(e) => {
                                  e.target.src="https://png.pngtree.com/png-clipart/20220419/ourmid/pngtree-azul-banner-png-png-image_4548281.png"
                                }} style={{maxWidth: "50px"}} fluid src={import.meta.env.VITE_IMAGE_URL+'banner/'+row.image} />
                              </td>
                              <td>
                                <Badge bg={`${row.status === 'active'? 'success' : 'danger'}`}>
                                  {row.status}
                                </Badge>
                              </td>
                              <td>
                                <NavLink to={'/admin/banner/'+row._id} className={"btn btn-sm btn-warning rounded-circle me-1"}>
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
                                }} to={'/admin/banner/'+row._id} className={"btn btn-sm btn-danger rounded-circle me-1"}>
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
                dataFetch={listBanners}
              />

            </Card.Body>
              
          </Card>
        </Container>
        
    </>)
}
export default BannerList