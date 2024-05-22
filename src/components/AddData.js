import React, { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import UserData from './services/UsersData';

const AddData = () => {
  const Navigate = useNavigate();

  const [name, setName]=useState(''); 
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
  
   const HandleSubmit =(event)=>{  
    event.preventDefault ();

    UserData.postData ({
    name:name,
    email:email,
    phone:phone,
    qualification:qualification,
    address:address
    }).then((response) =>{
        console.log(response);
        Navigate("/")
    })
   }


  return (
    <div className="body">
      <div className="booking-form mx-auto p-2">
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
  );
};

export default AddData;
