import { useEffect, useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(window.localStorage.getItem("username"));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid className="px-5">
        <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="mt-1" href="#">
              Welcome {username}
            </Nav.Link>
            {/* <Link to={"/myNews"}>News</Link>
            <Link to={"/userarticle"}>Add Article</Link> */}
            {/* <Nav.Link className="fs-5" href="/mynews">
              News
            </Nav.Link>
            <Nav.Link className="fs-5" href="/userarticle">
              Add Article
            </Nav.Link> */}
            <NavDropdown className="mt-1" title="Content Management System" id="basic-nav-dropdown">
              <NavDropdown.Item className="mt-1" href="/registrationlist">
                Registration Management
              </NavDropdown.Item>
              <NavDropdown.Item className="mt-1" href="/articlelist">
                Article Management
              </NavDropdown.Item>
              <NavDropdown.Item className="mt-1" href="/news">
                News Management
              </NavDropdown.Item>
              <NavDropdown.Item className="mt-1" href="/staff">
                Staff Management
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-info" className="mt-1" onClick={logout}>
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
