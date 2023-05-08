import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import react , {useEffect , useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate = useNavigate ();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const changeHandler = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let data = { email, password }
    let res = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    // console.log('Success:', data);
    setEmail("")
    setPassword("")
    // console.log(response)
    toast.success('logged in successfully!', {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    if (response) {
      setTimeout(() => {
        localStorage.setItem("token" , response.token)
        navigate('/');
      }, 5000);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={ 3000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Form className='container my-5' onSubmit={ submitHandler }>
        <h1>Sign in</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' value={ email } onChange={ changeHandler } type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' value={ password } onChange={ changeHandler } type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Signup;