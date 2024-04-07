import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const SideNavFooter = ({children}) =>{
    return(<>
    <div className='sb-sidenav-footer w-100 text-center'>
       {children}
    </div>
    </>)
}
const LoggedInUserName = ({children})=>{
    return(<>
     <div className='small'>
            Logged in as:
        </div>
        {children}
    </>)
}
export default function SidebarComponent() {
    return (
        <>
            <div id="layoutSidenav_nav">
                <Navbar id="sidenavAccordion" className="sb-sidenav accordion sb-sidenav-dark">
                    <Nav defaultActiveKey="/dashboard" className="flex-column">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="nav-link sb-sidenav-menu-heading">Core</div>
                                <NavLink className={"nav-link"} to="/admin">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </NavLink>
                                <NavLink className={"nav-link"} to="/home">
                                    <div className="sb-nav-link-icon"><i className="fas fa-home"></i></div>
                                    Home
                                </NavLink>

                                <div className="nav-link sb-sidenav-menu-heading">Features</div>
                                <NavLink className={"nav-link"} to="/admin/banner">
                                    <div className="sb-nav-link-icon"><i className="fas fa-images"></i></div>
                                    Banner Management
                                </NavLink>
                                <NavLink className={"nav-link"} to="/admin/brand">
                                    <div className="sb-nav-link-icon"><i className="fas fa-bookmark"></i></div>
                                    Brand Management
                                </NavLink>
                                <NavLink className={"nav-link"} to="/admin/category">
                                    <div className="sb-nav-link-icon"><i className="fas fa-sitemap"></i></div>
                                    Category Management
                                </NavLink>
                                <NavLink className={"nav-link"} to="/admin/user">
                                    <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                                    User Management
                                </NavLink>
                                <NavLink className={"nav-link"} to="/admin/product">
                                    <div className="sb-nav-link-icon"><i className="fas fa-store"></i></div>
                                    Products Management
                                </NavLink>
                                <NavLink className={"nav-link"} to="/admin/orders">
                                    <div className="sb-nav-link-icon"><i className="fas fa-shopping-cart"></i></div>
                                    Orders Management
                                </NavLink>
                                <NavLink className={"nav-link"} to="/admin/transactions">
                                    <div className="sb-nav-link-icon"><i className="fas fa-money-bill-1"></i></div>
                                    Transactions
                                </NavLink>                           
                                   
                                       
                             
                            </div>
                        </div>
                    </Nav>
                    {/* <Navbar.Collapse className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Paras Chand
                    </Navbar.Collapse> */}
                    <SideNavFooter>
                        <LoggedInUserName>
                            Paras Chand
                        </LoggedInUserName>
                    </SideNavFooter>
                </Navbar>
            </div>
        </>
    );
}
