import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import categorySvc from "./category.service"
import { toast } from "react-toastify"
import CategoryForm from "./category.form"



const CategoryEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    const [currentId, setCurrentId] = useState(null); // Track the current ID
    
    const editCategory = async (data) => {
        try {
            setLoading(true);
            let response = await categorySvc.updateCategory(params.id, data)
            toast.success("Category updated successfully.")
            navigate("/admin/category")
        } catch(exception) {
            toast.error("Category cannot be editd at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await categorySvc.getCategoryById(currentId)
            setDetail({
                title: response?.data?.result.title, 
                description: response?.data?.result.description, 
                status: response?.data?.result.status, 
                image: response?.data?.result.image
            })
        } catch(exception) {
            console.log(exception)
            toast.error("Category cannot be fetched at this moment")
            navigate("/admin/category")
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
          <Heading type={"h1"} className="mt-4" value={"Category Edit"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Category List", link: "/admin/category"},
            {title: "Category Edit", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Category Edit Form"}></Heading>
            </Card.Header>
            <Card.Body>
                
                {
                    loading ? <><Spinner variant="dark"/></> : 
                    <CategoryForm 
                        submitEvent={editCategory}
                        loading={loading}
                        detail={detail}
                    />
                }

            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default CategoryEdit