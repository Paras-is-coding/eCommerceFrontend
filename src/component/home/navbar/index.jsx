import { NavLink, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../config/theme.context";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import categorySvc from "../../../pages/cms/category/category.service";

function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [categs,setCategs] = useState();

  const getCategsList = useCallback(async()=>{
    try {
      let res = await categorySvc.getCategoryForHome();
      setCategs(res?.data?.result)
    } catch (error) {
      toast.error("Categories does not exist!")      
    }
  },[])
  useEffect(()=>{
    getCategsList();
  },[])

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

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme={theme}>
      <Container fluid>
        <Navbar.Brand href="#">BRANDNAME</Navbar.Brand>
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
            <Link to={"/services"} className={"nav-link"}>
              Services
            </Link>
            <NavDropdown title="Categories" id="navbarScrollingDropdown">
                {
                  categs && categs.map((cat,ind)=>(
                    <NavLink key={ind} to={"/category/"+cat.slug} className={"dropdown-item"}>
                    {cat.title}
                  </NavLink>
                  ))
                }

            </NavDropdown>
            <Link to={"/products"} className={"nav-link"}>
              Products
            </Link>
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
               <Link to={`/${loggedInUser.role}`} className={"nav-link"}>
                  {loggedInUser.name}
                </Link>
                <Link to={"/cart"} className={"nav-link"}>
                  Cart(0)
                </Link>
                <Link to={"/login"} className={"nav-link"}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to={"/register"} className={"nav-link"}>
                  Signup
                </Link>
                <Link to={"/login"} className={"nav-link"}>
                  Login
                </Link>
              </>
            )}

            <Link to={"/"} onClick={switchTheme} className={"nav-link"}>
              {theme}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
