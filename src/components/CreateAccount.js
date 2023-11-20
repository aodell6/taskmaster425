import React, { useState } from "react";
import '../createAccount.css';      // Import createAccount.css for styling

function CreateAccount({stateFunction, onDismiss}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = () => {
        console.log('clicked');
        stateFunction(true);
    };

    const handleDismissal = () => {
        onDismiss(false);
    }

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
                    {/* <button onClick={handleDismissal}> Go back </button> */}
                    <p>Already have an account? <a onClick={handleDismissal}>Sign in</a></p>
                </form>
            </div>
            <footer>
                &copy; 2023 'The Best Team'
            </footer>
        </div>
    );
}

export default CreateAccount;