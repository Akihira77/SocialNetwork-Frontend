import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { Table } from "react-bootstrap";
import URL_SERVER from "../constants/url";

export default function ArticleList() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getData();
    setRole(window.localStorage.getItem("username"));
  }, []);

  const getData = () => {
    // const url = "https://localhost:7047/api/Article/get-all-articles";
    const url = URL_SERVER + "/Article/get-all-articles";

    axios
      .get(url)
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

  const userApproval = (text, id) => {
    if (window.confirm(`${text} article id: ${id}?`)) {
      // const url = "https://localhost:7047/api/Article/articleApproval";
      const url = URL_SERVER + "/Article/articleApproval";

      axios
        .patch(url + `?id=${id}`)
        .then((res) => {
          const dt = res.data;
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container-fluid mt-3" style={{ paddingLeft: "5em", paddingRight: "5em" }}>
        <div className="text-center mb-3">
          <h2 className="fs-1">Article List</h2>
        </div>
        {data ? (
          <Table bordered hover striped className="text-center">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Email</th>
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
                  <td>{item.email}</td>
                  <td>
                    <img src={item.image} className="rounded" alt="imageArticle" />
                  </td>
                  <td>
                    {" "}
                    {item.isApproved ? (
                      <button
                        className="btn btn-secondary mx-auto"
                        onClick={() => userApproval("Disapprove", item.id)}
                      >
                        Disapprove
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary mx-auto"
                        onClick={() => userApproval("Approve", item.id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger mx-auto"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      Delete
                    </button>
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
