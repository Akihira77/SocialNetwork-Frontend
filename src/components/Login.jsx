import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import URL_SERVER from "../constants/url";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const url = URL_SERVER + "/Registration/login";
      const data = {
        Email: email,
        Password: password,
      };

      axios
        .post(url, data)
        .then((res) => {
          const dt = res.data;
          if (dt.statusCode === 200) {
            window.localStorage.setItem("username", email);
            if (dt.registration.userType === "ADMIN") {
              navigate("/admindashboard");
            } else {
              window.localStorage.setItem("loggedEmail", email);
              window.localStorage.setItem("username", dt.registration.name);
              if (dt.registration.userType === "STAFF") {
                navigate("/staffdashboard");
              } else {
                navigate("/userdashboard");
              }
            }
          }
          alert(dt.statusMessage);
        })
        .catch((err) => {
          alert(err);
        });
    }
    setValidated(true);
  };
  return (
    <Container className="p-3 my-5" style={{ height: "88vh" }}>
      <Row style={{ height: " 90vh", paddingTop: "6em" }}>
        <Col col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone"
          />
        </Col>

        <Col col="4" md="6">
          <Form noValidate validated={validated} onSubmit={handleLogin}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  className="py-2"
                  label="Email address"
                  type="email"
                  value={email}
                  placeholder="Enter Email..."
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  className="py-2"
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="..."
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Password cannot be empty.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-between mx-4 mb-4">
              <Form.Check name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
              <a href="!#">Forgot password?</a>
            </div>
            <Button type="submit" color="success" className="mb-4 w-100">
              Sign in
            </Button>
            <Button type="button" href="/register" className="w-100 btn-warning">
              Register
            </Button>
            <div className="divider d-flex align-items-center justify-content-center my-3">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>
            <Button className="mb-4 w-100" style={{ backgroundColor: "#3b5998" }}>
              <i className="fa-brands fa-facebook-f pe-2"></i>
              Continue with facebook
            </Button>
            <Button className="mb-4 w-100" style={{ backgroundColor: "#55acee" }}>
              <i className="fa-brands fa-twitter pe-2"></i>
              Continue with twitter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
