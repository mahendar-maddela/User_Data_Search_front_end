
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes,Route, Router } from 'react-router-dom';
import Data from './Data';
function NavBar() {
    return (
      <div className='navbarbg'>
       <Navbar expand="lg" className=" ">
      <Container fluid>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/datapage">Data</Nav.Link>
            <Nav.Link href="/AddData">AddData</Nav.Link>
         </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <Routes >
        <Route exact path='/datapage' element={Data} />
    </Routes>



      </div>
    );
  }
  
  export default NavBar;