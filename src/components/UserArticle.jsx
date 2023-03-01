import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import URL_SERVER from "../constants/url";

export default function UserArticle() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [validated, setValidated] = useState(false);
  const [statusEdit, setStatusEdit] = useState(false);
  const [id, setId] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  const SaveFile = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setValidated(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // const url = "https://localhost:7047/api/Article/get-articles-by-userType";
    const url = URL_SERVER + "/Article/get-articles-by-type";
    const data = {
      type: "USER",
      email: window.localStorage.getItem("loggedEmail"),
    };

    axios
      .post(url, data)
      .then((res) => {
        const dt = res.data;
        if (dt.statusCode === 200) {
          setData(dt.articleList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Clear = () => {
    window.location.reload();
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setLoadingForm(true);
      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("fileName", fileName);

      try {
        const url = URL_SERVER + "/Article/uploadFile";

        const res = await axios.post(url, formData);

        if (res.data.statusCode === 200 && res.data.statusMessage === "Image uploaded") {
          const data = {
            Title: title,
            Content: content,
            Email: window.localStorage.getItem("loggedEmail"),
            Image: res.data.imageUrl,
          };
          const next = await axios.post(URL_SERVER + "/Article/addArticle", data);

          if (next.data.statusCode === 200) {
            getData();
            Clear();
            alert("Article details saved");
          } else {
            alert(next.data.statusMessage);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(`Delete article id: ${id}?`)) {
      const url = URL_SERVER + "/Article/DeleteArticle";
      setLoadingList(true);
      axios
        .patch(url + `?id=${id}`)
        .then((res) => {
          const dt = res.data;
          getData();
          alert(dt.statusMessage);
          setLoadingList(false);
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
      Title: title,
      Content: content,
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

  const handleStatus = (e, item) => {
    e.preventDefault();

    setStatusEdit(true);
    setTitle(item.title);
    setContent(item.content);
    setFile(item.image);
    setId(item.id);
    window.scrollTo({
      top: 0,
      left: 0,
    });
  };
  return (
    <>
      <UserHeader />
      <Container className="mt-3" style={{ paddingLeft: "5em", paddingRight: "5em" }}>
        {loadingForm ? (
          <LoadingSpinner />
        ) : (
          <Form noValidate validated={validated} onSubmit={statusEdit ? handleEdit : uploadFile}>
            <div className="text-center pb-3">
              <h2>Add New Article</h2>
            </div>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
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
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  required
                  onChange={(e) => SaveFile(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Image file cannot empty.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Content"
                  style={{ height: "300px" }}
                  value={content}
                  required
                  onChange={(e) => setContent(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Content field cannot empty.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="ms-auto mt-4 w-25 d-flex justify-content-between">
              <Button className="py-2" style={{ width: "150px" }} variant="primary" type="submit">
                {statusEdit ? "Edit" : "Save"}
              </Button>
              <Button
                className="py-2 ms-3"
                style={{ width: "150px" }}
                variant="danger"
                type="button"
                onClick={Clear}
              >
                {statusEdit ? "Cancel" : "Reset"}
              </Button>
            </div>
          </Form>
        )}
        <div>
          <h2>Your Article List</h2>
        </div>
        {loadingList ? (
          <LoadingSpinner />
        ) : data ? (
          <Table bordered hover striped className="text-center my-5">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Image</th>
                <th>Status</th>
                <th>Actions</th>
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
                  <td>
                    <img src={item.image} className="rounded" alt="imageArticle" />
                  </td>
                  <td>{item.isApproved ? <p>Approved</p> : <p>Not Approved</p>}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-4">
                      <Button
                        className="btn-secondary"
                        style={{ width: "90px" }}
                        onClick={(e) => handleStatus(e, item)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-danger py-2"
                        style={{ width: "90px" }}
                        onClick={(e) => handleDelete(e, item.id)}
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
      </Container>
    </>
  );
}
