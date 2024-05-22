import React, { useEffect ,useState} from 'react'
// import React, { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import UsersData from './services/UsersData';
import { useParams } from 'react-router-dom';

const EditData = () => {
    const Navigate = useNavigate();

    const {id} = useParams();

    const [name, setName]=  useState('');
    const [email, setEmail]= useState('')
    const [phone, setPhone] =  useState('');
    const [qualification, setQualification] = useState('')
    const[address, setAddress] =useState('')
   
     const handleName =(event) =>{
      setName(event.target.value)
     }
     const handleEmail =(event) =>{
      setEmail(event.target.value)
     }
    const handlePhone=(event) =>{
      setPhone(event.target.value)
    }
     const handleQualification = (event) =>{
      setQualification(event.target.value)
     } 
     const handleAddress =(event) =>{
      setAddress(event.target.value)
     }

     useEffect(() =>{
        UsersData.getById(id).then(response =>{
            const obj = response.data;
              setName(obj.name);
              setEmail(obj.email);
              setPhone(obj.phone);
              setQualification(obj.qualification);
              setAddress(obj.address);
        }).catch(error => {
            console.error("Error fetching booking data: " + error);
        });
     }, [id])
    
     const HandleSubmit =(event)=>{  
      event.preventDefault ();
  
      UsersData.EditData(id,{
      name:name,
      email:email,
      phone:phone,
      qualification:qualification,
      address:address
      }).then((response) =>{
          console.log(response);
          Navigate("/")
      }) .catch(error => {
        alert("Error updating student: " + error);
    });
     }
  return (
    <div>
        <div className="booking-form mx-auto">
        <div className=" d-flex justify-content-end text-center ">
          <CloseButton onClick={() => Navigate("/")} />
        </div>
        <Form onSubmit={HandleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" onChange={handleName} value={name}/>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  onChange={handleEmail} value={email}/>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridPhone">
            <Form.Label>Phone No.</Form.Label>
            <Form.Control type="number" placeholder="123xxxxxx" onChange={handlePhone} value={phone} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridQualification">
            <Form.Label>Qualification</Form.Label>
            <Form.Control placeholder="BTech" type="text" onChange={handleQualification} value={qualification}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1" >
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" onChange={handleAddress} value={address} />
          </Form.Group>

          <div className="text-center ">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      
    </div>
  )
}

export default EditData
