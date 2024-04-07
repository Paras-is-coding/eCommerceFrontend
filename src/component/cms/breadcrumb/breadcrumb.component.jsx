import { Breadcrumb as BSBreadcrumb } from "react-bootstrap"
import { NavLink } from "react-router-dom"
const BreadCrumbItem = ({className, children}) => {
    return (<>
        <li className={`breadcrumb-item ${className ? className : ''}`}>
            {children}
        </li>
    </>)
}

const Breadcrumb = ({data}) =>{
    return(<>
    <BSBreadcrumb className="mb-4">
        {
            data && data.map((row, ind) => (
                <BreadCrumbItem key={ind} className={`${row.link ? '' : 'active'}`}>
                    {
                        row.link ? <NavLink to={row.link}>{row.title}</NavLink> : row.title
                    }
                </BreadCrumbItem>
            ))
        }
    </BSBreadcrumb>
    
    </>)
}
export default Breadcrumb