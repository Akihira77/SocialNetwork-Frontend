import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import Table from "react-bootstrap/Table";
import URL_SERVER from "../constants/url";

export default function RegistrationList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url = URL_SERVER + "/Registration/registrationList/user";

    axios
      .get(url)
      .then((res) => {
        const dt = res.data;
        if (dt.statusCode === 200) {
          setData(dt.registrationList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userApproval = (id) => {
    const url = URL_SERVER + "/Registration/userApproval";

    axios
      .patch(url + `?id=${id}`)
      .then((res) => {
        const dt = res.data;
        alert(dt.statusMessage);
        getData();
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AdminHeader />
      <div className="container-fluid mt-3" style={{ paddingLeft: "5em", paddingRight: "5em" }}>
        <div className="text-center mb-3">
          <h2>Registration List</h2>
        </div>
        {data ? (
          <Table bordered hover striped className="text-center">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>IsApproved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.isApproved}</td>
                  <td>
                    {item.isApproved ? (
                      <p>Approved</p>
                    ) : (
                      <button className="btn btn-primary" onClick={() => userApproval(item.id)}>
                        Approve
                      </button>
                    )}
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
