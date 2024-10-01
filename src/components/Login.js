import React, { useState } from 'react';
import '../styles/Login.css';


// functional componnets => LoginPage for handling the end points!
var LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple validation of username and password!
        if (!username || !password) {
            setError('please provide username and password');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://onlineorderapi.warehousingexpress.in/api/we1AppLogin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }


            console.log('Login successfull:', data);
            // Clear username and password  fields after form submission submission 
            setUsername('');
            setPassword('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in data ' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
