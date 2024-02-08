import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        const data = {
            "userName": username,
            "password": password
        }

        try {
            const response = await axios.post('http://localhost:8081/auth/login', data);
            if (response.status === 200) {
                localStorage.setItem("token", response.data);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                navigate("/");
            }
        } catch (error) {
            console.log("Login error:", error);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className=" mb-4">User Login</h1>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
