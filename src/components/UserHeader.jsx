import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";

export default function UserHeader() {
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
    <Navbar bg="dark" variant="dark" className="py-3" expand="lg">
      <Container fluid className="px-5">
        <Navbar.Brand href="#">User Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="mt-1" href="#">
              Welcome {username}
            </Nav.Link>
            {/* <Link to={"/myNews"}>News</Link>
            <Link to={"/userarticle"}>Add Article</Link> */}
            <Nav.Link className="mt-1" href="/myNews">
              News
            </Nav.Link>
            <Nav.Link className="mt-1" href="/userArticle">
              Add Article
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Form className="d-flex">
            <Button type="submit" className="mt-1" variant="outline-info" onClick={logout}>
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
