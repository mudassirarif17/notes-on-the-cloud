import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap'
import { Link, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BasicNav() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container className='sticky'>
        <Navbar.Brand href="#home">iNoteBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
      { !localStorage.getItem('token') ?
        <div className='d-flex'>
          <LinkContainer to="/signin">
            <Button className='mx-1' variant="primary">Login</Button>
          </LinkContainer>
          <LinkContainer to="/signup">
          <Button className='mx-1' variant="primary">Signup</Button>
          </LinkContainer>
          </div>
        : <Button className='mx-1' onClick={ logout } variant="primary">Logout</Button> }
    </Navbar>
  );
}

export default BasicNav;