import { NavLink, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../config/theme.context";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";
import categorySvc from "../../../pages/cms/category/category.service";
import { FaRegUser } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { Image } from "react-bootstrap";

function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [categs, setCategs] = useState();
  const navigate = useNavigate()

  const getCategsList = useCallback(async () => {
    try {
      let res = await categorySvc.getCategoryForHome();
      setCategs(res?.data?.result);
    } catch (error) {
      toast.error("Categories does not exist!");
    }
  }, []);
  useEffect(() => {
    getCategsList();
  }, []);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme !== theme) toggleTheme(theme);
  }, []);

  const switchTheme = (e) => {
    e.preventDefault();
    toggleTheme(theme);
  };

  // from store
  const loggedInUser = useSelector((store) => {
    return store.User.loggedInUser;
  });

  const handleLogout = () => {
    try {
        // Clear localStorage items
    localStorage.removeItem('_au');
    localStorage.removeItem('_user');

    // Redirect to login page
    navigate('/login');
    } catch (error) {
      console.log(error)
    }
  
}

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme={theme}>
      <Container fluid>
        <NavLink to={'/'} className={'nav-link'}>
        <Navbar.Brand className="fs-2" >PGlamify</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink to={"/"} className={"nav-link"}>
              Home
            </NavLink>
            <Link to={"/products"} className={"nav-link"}>
              Products
            </Link>

            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              {categs &&
                categs.map((cat, ind) => (
                  <NavLink
                    key={ind}
                    to={"/category/" + cat.slug}
                    className={"dropdown-item"}
                  >
                    {cat.title}
                  </NavLink>
                ))}
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Nav className="justify-content-end ps-2">
            {loggedInUser ? (
              <>
                <Link to={`/${loggedInUser.role}`} className={"nav-link "}>
                  <Image
                    onError={(e) => {
                      e.target.src =
                        "https://png.pngtree.com/png-clipart/20220419/ourmid/pngtree-azul-banner-png-png-image_4548281.png";
                    }}
                    style={{ maxWidth: "36px" }}
                    className="border rounded-circle"
                    fluid
                    src={import.meta.env.VITE_IMAGE_URL + "user/" + loggedInUser.image}
                  />
                  {/* {loggedInUser.name} */}
                </Link>
                <Link to={"/carts"} className={"nav-link my-auto "}>
                <FaCartShopping className="fs-4"/>
                  (0)
                </Link>
                <Link
                to={"#"}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout()
                }}
                  className={"nav-link my-auto "}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"} className={"nav-link border-end my-auto"}>
                  <FaRegUser className="me-1" />
                  Login
                </Link>
                <Link to={"/register"} className={"nav-link my-auto"}>
                  Signup
                </Link>
              </>
            )}

            <Link to={"/"} onClick={switchTheme} className={"nav-link my-auto"}>
              <MdDarkMode className="fs-2 border  rounded-circle p-1" />
              {/* {theme} */}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
