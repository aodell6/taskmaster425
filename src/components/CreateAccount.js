import React, { useState } from "react";
import '../createAccount.css';

function CreateAccount({stateFunction}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = () => {
        console.log('clicked');
        stateFunction(true);
    };

    return (
        <div className="title-page">

            <div className="title-container">
                <h1 className="title">EasySprint</h1>
            </div>

            <div className="create-account-container">
                <h2>Create Account</h2>
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
                    <label>Re-enter Password:
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button onClick={handleCreateAccount}>Create Account</button>
                </form>
            </div>
            <footer>
                &copy; 2023 'The Best Team'
            </footer>
        </div>
    );
}

export default CreateAccount;