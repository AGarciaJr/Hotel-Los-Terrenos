import React, { useState } from 'react';
import serviceAPI from '../../service/serviceAPI';
import { useNavigate } from 'react-router-dom';

const CreateClerkPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error state

        try {
            const newClerk = { username, password };
            const response = await serviceAPI.registerUser(newClerk);
            if (response.success) {
                navigate('/admin'); // Redirect to admin page on success
            } else {
                setError('Failed to create clerk account');
            }
        } catch (err) {
            console.error('Error creating clerk account:', err);
            setError('An error occurred while creating the account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-clerk-page">
            <h2>Create Clerk Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Clerk Account'}
                </button>
            </form>
        </div>
    );
};

export default CreateClerkPage;
