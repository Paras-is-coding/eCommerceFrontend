import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import bannerSvc from "./banner.service"
import { toast } from "react-toastify"
import BannerForm from "./banner.form"



const BannerEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    const [currentId, setCurrentId] = useState(null); // Track the current ID
    
    const editBanner = async (data) => {
        try {
            setLoading(true);
            let response = await bannerSvc.updateBanner(params.id, data)
            toast.success("Banner updated successfully.")
            navigate("/admin/banner")
        } catch(exception) {
            toast.error("Banner cannot be editd at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await bannerSvc.getBannerById(currentId)
            setDetail({
                title: response?.data?.result.title, 
                url: response?.data?.result.url, 
                status: response?.data?.result.status, 
                image: response?.data?.result.image
            })
        } catch(exception) {
            console.log(exception)
            toast.error("Banner cannot be fetched at this moment")
            navigate("/admin/banner")
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
          <Heading type={"h1"} className="mt-4" value={"Banner Edit"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Banner List", link: "/admin/banner"},
            {title: "Banner Edit", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Banner Edit Form"}></Heading>
            </Card.Header>
            <Card.Body>
                
                {
                    loading ? <><Spinner variant="dark"/></> : 
                    <BannerForm 
                        submitEvent={editBanner}
                        loading={loading}
                        detail={detail}
                    />
                }

            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default BannerEdit