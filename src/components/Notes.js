import react, { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function TextExample() {
  const [show, setShow] = useState(false);
  const [allnotes, setAllnotes] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const onLoad =  () => {
  //   const response = fetch(`http://localhost:5000/api/notes/getnotes`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNDg2NTllZWNiMTEyNzM3Y2UwZDQzIn0sImlhdCI6MTY1NTk5ODY0NH0.1KOxN-uWkAWwneXQBXxgwKJoCigaDb_jXWP1wx4_Fq4"
  //       "auth-token" : localStorage.getItem('token')
  //     }
  //   });
  //   const jsonData =  response.json();
  //   // console.log(jsonData);
  //   setAllnotes(jsonData);
  //   console.log(setAllnotes);
  // }

  // useEffect(onLoad)

  return (
    <>
      <div className='container'>
        <h3>Your Notes</h3>
        <Card style={ { width: '18rem' } }>
          <div>
            <Badge className="bg-info"></Badge>
          </div>
          <Card.Body>
            <div className='d-flex justify-content-between'>
              <Card.Title>ggg</Card.Title>
              <div>
                <AiOutlineDelete className='mx-1' />
                <BiEdit onClick={ handleShow } />
              </div>
            </div>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text>Tag hereggg</Card.Text>
          </Card.Body>
        </Card>
      </div>

      {/* Modal */ }
      <Modal
        show={ show }
        onHide={ handleClose }
        backdrop="static"
        keyboard={ false }
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter your changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='container my-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={ 3 } placeholder="Enter description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tag</Form.Label>
              <Form.Control type="text" placeholder="Tag" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TextExample;