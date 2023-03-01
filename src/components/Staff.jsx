import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Form from "react-bootstrap/Form";
import { Button, Col, Row, Table } from "react-bootstrap";
import URL_SERVER from "../constants/url";

export default function Staff() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState("");
  const [hide, setHide] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url = URL_SERVER + "/Registration/registrationList/staff";

    axios
      .get(url)
      .then((res) => {
        const dt = res.data;
        console.log(dt);
        if (dt.statusCode === 200) {
          setData(dt.staffList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Clear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const data = {
        Name: name,
        Email: email,
        Password: password,
      };

      const url = URL_SERVER + "/Registration/staff-register";

      axios
        .post(url, data)
        .then((res) => {
          const dt = res.data;
          if (dt.statusCode === 200) {
            getData();
            Clear();
            alert("Staff Created");
          } else {
            alert(dt.statusMessage);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setValidated(true);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(`Delete article id: ${id}?`)) {
      const url = URL_SERVER + "/Article/DeleteArticle";
      axios
        .patch(url + `?id=${id}`)
        .then((res) => {
          const dt = res.data;
          getData();
          alert(dt.statusMessage);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();

    const url = URL_SERVER + "/Article/updateArticle";
    const data = {
      Id: id,
      Name: name,
      Email: window.localStorage.getItem("loggedEmail"),
    };

    axios
      .post(url, data)
      .then((res) => {
        const dt = res.data;
        getData();
        alert(dt.statusMessage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AdminHeader />
      <div className="container-fluid mt-5" style={{ paddingLeft: "5em", paddingRight: "5em" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="text-center pb-3">
            <h2>Staff Management</h2>
          </div>
          <div className="d-flex justify-content-between gap-3">
            <Row className="mb-3 w-50">
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Name field cannot empty.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3 w-75">
              <Form.Group as={Col}>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </div>{" "}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="password"
                className="fs-4"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">Password cannot be empty</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="ms-auto mt-4 w-25 d-flex justify-content-between">
            <Button
              className="fs-5 py-2"
              style={{ width: "150px" }}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className="fs-5 py-2"
              style={{ width: "150px" }}
              variant="danger"
              type="button"
              onClick={Clear}
            >
              Reset
            </Button>
          </div>
        </Form>
        {data ? (
          <Table bordered hover striped className="text-center mt-5">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th style={{ maxWidth: "100px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td style={{ maxWidth: "100px" }}>
                    <div className="d-flex justify-content-center gap-4">
                      <Button
                        className="btn-secondary"
                        style={{ width: "90px" }}
                        onClick={(e) => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-danger py-2"
                        style={{ width: "90px" }}
                        onClick={(e) => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="d-flex justify-content-center">
            <p className="fs-1">
              <em>loading...</em>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
