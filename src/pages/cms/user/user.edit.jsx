// UserEdit.jsx
import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import userSvc from "./user.service" // Import user service
import { toast } from "react-toastify"
import UserForm from "./user.form" // Import user form

const UserEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState({
        name: "",
        email: "",
        status: "",
        address: {
            shipping: "",
            billing: ""
        },
        role: "",
        phone: "",
        image: null // Include image field
    });
    const [currentId, setCurrentId] = useState(null); // Track the current ID
    
    const editUser = async (data) => {
        try {
            setLoading(true);
            let response = await userSvc.updateUserById(params.id, data)
            toast.success("User updated successfully.")
            navigate("/admin/user")
        } catch(exception) {
            toast.error("User cannot be edited at this moment.")
            console.log(exception)
        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await userSvc.getUserById(currentId)
            setDetail({
                name: response?.data?.result.name, 
                email: response?.data?.result.email, 
                status: response?.data?.result.status, 
                address: response?.data?.result.address || {}, // Check if address exists
                role: response?.data?.result.role,
                phone: response?.data?.result.phone,
                image: response?.data?.result.image // Set image field value
            })
        } catch(exception) {
            console.log(exception)
            toast.error("User cannot be fetched at this moment")
            navigate("/admin/user")
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

    return (
        <Container fluid className="px-4">
            <Heading type={"h1"} className="mt-4" value={"User Edit"}></Heading>
            <Breadcrumb data={[
                {title: "Dashboard", link: "/admin"},
                {title: "User List", link: "/admin/user"},
                {title: "User Edit", link: null}
            ]}/>
            <Card className="mb-4">
                <Card.Header>
                    <Heading type={"h4"} className={"float-start"} value={"User Edit Form"}></Heading>
                </Card.Header>
                <Card.Body>
                    {loading ? <Spinner variant="dark"/> : 
                        <UserForm 
                            submitEvent={editUser}
                            loading={loading}
                            detail={detail}
                        />
                    }
                </Card.Body>
            </Card>
        </Container>
    );
}

export default UserEdit;
