import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import UserHeader from "./UserHeader";
import axios from "axios";
import URL_SERVER from "../constants/url";

export default function MyNews() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url = URL_SERVER + "/News/mynews";

    const data = {
      email: window.localStorage.getItem("loggedEmail"),
    };
    axios
      .post(url, null, {
        params: data,
      })
      .then((res) => {
        const dt = res.data;
        if (dt.statusCode === 200) {
          setData(dt.newsList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Clear = () => {
    setTitle("");
    setContent("");
    setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const url = URL_SERVER + "/News/addNews";
      const data = {
        Title: title,
        Content: content,
        Email: window.localStorage.getItem("loggedEmail"),
      };

      axios.post(url, data).then((res) => {
        const dt = res.data;
        console.log(dt);
        if (dt.statusCode === 200) {
          alert(dt.statusMessage);
          getData();
          Clear();
        } else {
          alert(dt.statusMessage);
        }
      });
    }
    setValidated(true);
  };
  return (
    <>
      <UserHeader />
      <div className="container mt-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="text-center pb-3">
            <h2>News Management</h2>
          </div>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Title field cannot empty.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                as="textarea"
                placeholder="Enter Content"
                style={{ height: "200px" }}
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Content field cannot empty.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="mt-4 w-25 d-flex justify-content-between">
            <Button className="py-2" style={{ width: "150px" }} variant="primary" type="submit">
              Submit
            </Button>
            <Button
              className="py-2"
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
                <th>Title</th>
                <th>Content</th>
                <th>CreatedOn</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td
                    className="overflow-hidden text-nowrap"
                    style={{ maxWidth: "250px", textOverflow: "ellipsis" }}
                  >
                    {item.title}
                  </td>
                  <td
                    className="overflow-hidden text-nowrap"
                    style={{ maxWidth: "250px", textOverflow: "ellipsis" }}
                  >
                    {item.content}
                  </td>
                  <td>{item.createdOn}</td>
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
