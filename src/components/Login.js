import React, { useState } from "react";

import '../login.css';


function Login({stateFunction}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

            const loginUser = async () =>{
                const customer = await fetch("/authLogin", {
                    method: "post",
                    headers: {
                    "content-type": "application/json",
                    Accept: "application/json",
                    },
                    body: JSON.stringify({
                        userID: email,
                        password: password,
                    }),
                }).then((res) => res.json());
                console.log(customer);
            };

            loginUser();

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

            <footer>
                &copy; 2023 'The Best Team'
            </footer>
        </div>
    );
}

export default Login;
