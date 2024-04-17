import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userAccounts, setUserAccounts] = useState([]);

    useEffect(() => {
        console.log("User accounts updated:", userAccounts);
    }, [userAccounts]);

    const handleLogin = () => {
        // Check if the entered username and password match any existing account
        const user = userAccounts.find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            // No need to reset username and password here
        } else {
            alert('Incorrect username or password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleCreateAccount = () => {
        setIsCreatingAccount(true);
    };

    const handleSignUp = () => {
        // Create a new user account and add it to the userAccounts array
        const newUser = { username, password, email };
        setUserAccounts([...userAccounts, newUser]);
        setIsLoggedIn(true);
        setIsCreatingAccount(false);
        setUsername('');
        setPassword('');
        setEmail('');
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className='logged-in'>
                    <h1>Welcome {username}!</h1>
                    <button onClick={handleLogout}>Log out</button>
                    <p>View your account details:</p>
                    <ul>
                        <li>Username: {username}</li>
                        <li>Email: {email}</li>
                    </ul>
                </div>
            ) : isCreatingAccount ? (
                <div>
                    <h1>Create Account</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleSignUp}>Sign Up</button>
                </div>
            ) : (
                <div>
                    <h1>Profile Sign In</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Sign In</button>
                    <p>Don't have an account? <button onClick={handleCreateAccount}>Create one</button></p>
                </div>
            )}
        </div>
    );
};

export default Profile;