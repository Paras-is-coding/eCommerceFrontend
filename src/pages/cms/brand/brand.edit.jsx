import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import brandSvc from "./brand.service"
import { toast } from "react-toastify"
import BrandForm from "./brand.form"



const BrandEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    const [currentId, setCurrentId] = useState(null); // Track the current ID
    
    const editBrand = async (data) => {
        try {
            setLoading(true);
            let response = await brandSvc.updateBrand(params.id, data)
            toast.success("Brand updated successfully.")
            navigate("/admin/brand")
        } catch(exception) {
            toast.error("Brand cannot be editd at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await brandSvc.getBrandById(currentId)
            setDetail({
                title: response?.data?.result.title, 
                description: response?.data?.result.description, 
                status: response?.data?.result.status, 
                image: response?.data?.result.image
            })
        } catch(exception) {
            console.log(exception)
            toast.error("Brand cannot be fetched at this moment")
            navigate("/admin/brand")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Update currentId when params.id changes
        setCurrentId(params.id);
      }, [params.id]);

    useEffect(() => {
         if (currentId !== null) {
      getById();
    }
    }, [currentId])

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Brand Edit"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Brand List", link: "/admin/brand"},
            {title: "Brand Edit", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Brand Edit Form"}></Heading>
            </Card.Header>
            <Card.Body>
                
                {
                    loading ? <><Spinner variant="dark"/></> : 
                    <BrandForm 
                        submitEvent={editBrand}
                        loading={loading}
                        detail={detail}
                    />
                }

            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default BrandEdit