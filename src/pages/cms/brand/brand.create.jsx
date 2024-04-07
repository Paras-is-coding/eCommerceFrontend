import { Container, Card } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import brandSvc from "./brand.service"
import { toast } from "react-toastify"
import BrandForm from "./brand.form"




const BrandCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const createBrand = async (data) => {
        try {
            setLoading(true);
            let response = await brandSvc.storeBrand(data)
            toast.success("Brand Created successfully.")
            navigate("/admin/brand")
        } catch(exception) {
            toast.error("Brand cannot be created at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }
    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Brand Create"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Brand List", link: "/admin/brand"},
            {title: "Brand Create", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Brand Create Form"}></Heading>
            </Card.Header>
            <Card.Body>
                <BrandForm 
                submitEvent={createBrand}
                loading={loading}
                />
            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default BrandCreate