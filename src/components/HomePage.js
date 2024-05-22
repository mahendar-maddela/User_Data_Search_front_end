import React, { useState } from "react";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import UsersData from "./services/UsersData";

function HomePage() {
  const Navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let apiUrl;
      let apiUrl2;
      let apiUrl3;
      if (!searchQuery.trim()) {
        setSearchResult([]); // Clear search results
        return; // Exit early if search query is empty or whitespace only
      }

      if (!isNaN(searchQuery)) {
        apiUrl = `http://localhost:8080/api/v2/users/byIdOrName?id=${searchQuery}`;
        apiUrl2 = `http://localhost:8080/api/v2/users/byEmailAndPhone?id=${searchQuery}`;
        apiUrl3 = `http://localhost:8080/api/v2/users/byQualificationAndAddress?id=${searchQuery}`;
      } else if (searchQuery.includes("@")) {
        apiUrl = `http://localhost:8080/api/v2/users/byIdOrName?email=${searchQuery}`;
        apiUrl2 = `http://localhost:8080/api/v2/users/byEmailAndPhone?email=${searchQuery}`;
        apiUrl3 = `http://localhost:8080/api/v2/users/byQualificationAndAddress?email=${searchQuery}`;
      } else {
        apiUrl = `http://localhost:8080/api/v2/users/byIdOrName?name=${searchQuery}`;
        apiUrl2 = `http://localhost:8080/api/v2/users/byEmailAndPhone?name=${searchQuery}`;
        apiUrl3 = `http://localhost:8080/api/v2/users/byQualificationAndAddress?name=${searchQuery}`;
      }

      // Use axios.all() to fetch data from multiple APIs concurrently
      const [response1, response2, response3] = await axios.all([
        axios.get(apiUrl),
        axios.get(apiUrl2),
        axios.get(apiUrl3),
      ]);

      // Combine responses into a single object
      const combinedResult = {
        id: response1.data.id || response1.data[0].id,
        name: response1.data.name || response1.data[0].name,
        email: response2.data.email || response2.data[0].email,
        phone: response2.data.phone || response2.data[0].phone,
        qualification:
            response3.data.qualification || response3.data[0].qualification,
        address: response3.data.address || response3.data[0].address,
      };

      // Update search result with the combined result
      setSearchResult([combinedResult]);
    } catch (error) {
      setSearchResult([]);
      console.error("Error:", error);
    }
    setSearchQuery("");
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const RemoveUser = (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      // If user confirms, proceed with deletion
      UsersData.DeleteData(id)
        .then((response) => {
          console.log("Deleted");
          setSearchResult([]);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    } else {
      console.log("Deletion cancelled by user");
    }
  };

  return (
    <div className="body">
      <NavBar />
      <div className="container-fluid main_container">
        <div className="row mb-3 justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            {/* Search Form */}
            <Form
              className="d-flex justify-content-center search_bar"
              onSubmit={handleSubmit}
            >
              <Form.Control
                type="search"
                placeholder="Id, Name, Email"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </div>
        </div>

        {/* Render search results */}
        <div className="row justify-content-center g-3">
          {/* Render first card */}
          {searchResult.map((result, id) => (
            <div className="col-md-8  mb-3" key={id}>
              <div className="d-flex parent ">
                <div className=" col-md-5 g-3">
                  <div className="left_side_container">
                    <h3>
                      <ul type="1">
                        <li>id: {result.id}</li>
                        <li>name: {result.name}</li>
                      </ul>
                    </h3>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="right_side_container">
                    <h3>
                      <ul>
                        <li>email: {result.email}</li>
                        <li>phone: {result.phone}</li>
                      </ul>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row justify-content-center">
          {/* Render second card */}
          {searchResult.map((result, id) => (
            <div className="col-md-8  mb-3" key={id}>
              <div className="middle_side_container">
                <h3>
                  <ul>
                    <li>qualification: {result.qualification}</li>
                    <li>Address: {result.address}</li>
                  </ul>
                  <div className="mx-auto text-center">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => Navigate("/editform/" + result.id)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => RemoveUser(result.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
