import React, { useState } from "react";
import '../login.css';


function Login({stateFunction}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

            console.log('clicked');
            stateFunction(true);
        };

    return (
        <div className="title-page">

            <div className="title-container">
            <h1 className="title">Task Management</h1>
            </div>
        
            <div className="login-container">
                <h2>Login</h2>
                <form>
                    <label>Email:
                        <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </label>
                    <label>Password:
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </label>
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;