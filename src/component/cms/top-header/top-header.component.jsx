import React from 'react';
import { Navbar, Button, NavDropdown, NavLink, Dropdown } from 'react-bootstrap';

export default function TopHeaderComponent() {
    const handleToggleSidebar = (event) => {
        event.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
    };

    return (
        <>
            <Navbar className='sb-topnav' bg='dark' expand="lg" variant="dark">
                {/* Navbar Brand */}
                <NavLink className={"navbar-brand ps-3"} to='/admin'>Admin Pannel</NavLink>

                {/* Sidebar Toggle */}
                <Button
                    onClick={handleToggleSidebar}
                    variant="link"
                    className="btn-sm order-1 order-lg-0 me-4 me-lg-0"
                    id="sidebarToggle"
                >
                    <i className="fas fa-bars"></i>
                </Button>

                {/* just for space */}
                <div className='d-md-inline-block form-inline ms-auto  me-0 me-md-3 my-2 my-md-0'></div>


                 {/* Navbar Right */}
                 <Dropdown className="ms-auto ms-md-0 me-3 me-lg-4"  align={'end'}>
                    <Dropdown.Toggle id="dropdown-basic" className='text-white bg-dark'>
                    <i className="fas fa-user fa-fw"></i>
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <NavLink to="/me" className="dropdown-item mx-2">Update Profile</NavLink>
                        <NavLink to="/reset-password" className="dropdown-item mx-2">Change Password</NavLink>
                        <div className="dropdown-divider"></div>
                        <NavLink to="/logout" className="dropdown-item mx-2">Logout</NavLink>
                        </Dropdown.Menu>
                    
                </Dropdown>
            </Navbar>
        </>
    );
}
