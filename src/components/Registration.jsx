import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import URL_SERVER from "../constants/url";

export default function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const clear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setConfirmPassword("");
    setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (confirmPassword === password) {
        const url = URL_SERVER + "/Registration/register";
        const data = {
          Name: name,
          Email: email,
          Password: password,
          PhoneNumber: phoneNumber,
        };

        axios
          .post(url, data)
          .then((res) => {
            clear();
            const dt = res.data;
            alert(dt.statusMessage);
            if (dt.statusCode === 200) {
              navigate("/");
            }
            // window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("password and confirm password must same");
      }
    }
    setValidated(true);
  };

  return (
    <Container fluid className=" bg-dark overflow-hidden" style={{ height: "100vh" }}>
      <Row className="d-flex mx-auto pt-5 container" style={{ height: "83vh" }}>
        <Col>
          <Card className="my-4">
            <Row className="g-0">
              <Col md="6" className="d-none d-md-block">
                <Card.Img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo"
                  className="rounded-start"
                  style={{ height: "83vh", width: "100%" }}
                />
              </Col>

              <Col md="6">
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                  <Card.Body className="text-black d-flex flex-column">
                    <h3 className="mb-5 text-uppercase fw-bold">Student registration form</h3>

                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Control
                          className="py-2"
                          label="Name"
                          type="text"
                          value={name}
                          required
                          placeholder="Enter Name..."
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Name cannot be empty.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

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
                          label="Phone Number"
                          type="text"
                          value={phoneNumber}
                          required
                          placeholder="Enter Phone Number..."
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Phone Number cannot be empty.
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
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Control
                          className="py-2"
                          label="Confirm Password"
                          type="password"
                          value={confirmPassword}
                          placeholder="..."
                          required
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Confirm Password must same with Password
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <div className="d-flex justify-content-end pt-3">
                      <Button type="button" className="border btn-secondary" onClick={clear}>
                        Reset
                      </Button>
                      <Button type="submit" className="ms-2 border">
                        Submit
                      </Button>
                      <Button type="button" className="ms-2 border btn-success" href="/">
                        Login
                      </Button>
                    </div>
                  </Card.Body>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
