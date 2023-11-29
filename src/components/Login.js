import React, { useState } from "react";
import '../login.css';
import Logo from "./Logo.png";

function Login({stateFunction, signUpFunction}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
            console.log('clicked');
            stateFunction(true);
    };

    const handleSignUp = () => {
        console.log('clicked');
        signUpFunction(true);
    };

    return (
        <div className="title-page">
            <div className="title-container">
                <h1 className="title">
                    <img src = {Logo} alt = "Logo" className = "center" />
                    EasySprint
                </h1>
            </div>

            {/* Email and Password boxes */}
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
                    {/* Adding a link to signup */}
                    <p>Don't have an account? <a onClick={handleSignUp}>Sign up</a></p>
                </form>
            </div>

            <footer>
                O'Dell, Baker, Sternberg 2023
            </footer>
        </div>
    );
}

export default Login;
