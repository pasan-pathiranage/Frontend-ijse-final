import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setpassword(event.target.value);
  }

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      "userName": username,
      "email": email,
      "password": password
    }

    const response = await axios.post('http://localhost:8081/auth/register', data);

    if (response.status === 200) {
      navigate("/login");
    } else {
      console.log("error")
    }
  }



  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h1 className='mb-4'>Sign Up</h1>
              <form onSubmit={handleRegister}>
                <div className='mb-3'>
                  <input type='text' className='form-control' onChange={handleUsername} placeholder='Your name' />
                </div>
                <div className='mb-3'>
                  <input type='email' className='form-control' onChange={handleEmail} placeholder='Email Address' />
                </div>
                <div className='mb-3'>
                  <input type='password' className='form-control' onChange={handlePassword} placeholder='Password' />
                </div>
                <button type='submit' className='btn btn-danger btn-block'>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
