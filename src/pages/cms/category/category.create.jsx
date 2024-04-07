import { Container, Card } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import categorySvc from "./category.service"
import { toast } from "react-toastify"
import CategoryForm from "./category.form"




const CategoryCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const createCategory = async (data) => {
        try {
            setLoading(true);
            let response = await categorySvc.storeCategory(data)
            toast.success("Category Created successfully.")
            navigate("/admin/category")
        } catch(exception) {
            toast.error("Category cannot be created at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }
    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Category Create"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Category List", link: "/admin/category"},
            {title: "Category Create", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Category Create Form"}></Heading>
            </Card.Header>
            <Card.Body>
                <CategoryForm 
                submitEvent={createCategory}
                loading={loading}
                />
            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default CategoryCreate