import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../config";
import Button from "../Button/Button";

const StudentPage = () => {
  const [data, setData] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    axios
      .get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <h2>Student Endpoint</h2>
      <p>{data}</p>
      <Button handleOnClick={handleLogout}>Wyloguj</Button>
    </div>
  );
};

export default StudentPage;
