import { Container, Card } from "react-bootstrap";
import { Heading } from "../../../component/common/heading/heading.component";
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userSvc from "./user.service"; // Import user service
import { toast } from "react-toastify";
import UserForm from "./user.form"; // Assuming there's a UserForm component for user creation

const UserCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const createUser = async (data) => {
        try {
            setLoading(true);
            let response = await userSvc.createUserByAdmin(data); 
            toast.success("User created successfully.");
            navigate("/admin/user"); // Redirect to the user list page
        } catch(exception) {
            toast.error("User creation failed."); // Handle error
            console.error(exception);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="px-4">
            <Heading type={"h1"} className="mt-4" value={"User Create"} />
            <Breadcrumb data={[
                {title: "Dashboard", link: "/admin"},
                {title: "User List", link: "/admin/user"},
                {title: "User Create", link: null}
            ]} />
            <Card className="mb-4">
                <Card.Header>
                    <Heading type={"h4"} className={"float-start"} value={"User Create Form"} />
                </Card.Header>
                <Card.Body>
                    <UserForm 
                        submitEvent={createUser}
                        loading={loading}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserCreate;
