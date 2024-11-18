import React, { useState } from 'react';
import serviceAPI from '../../service/serviceAPI';
import { useNavigate } from 'react-router-dom';

const UpdatePasswordPage = () => {
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error state

        try {
            const response = await serviceAPI.updateUserPassword(userId, newPassword);
            if (response.status === 200) {
                navigate('/admin'); // Redirect to admin page on success
            } else {
                setError('Failed to update password');
            }
        } catch (err) {
            console.error('Error updating password:', err);
            setError('An error occurred while updating the password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-password">
            <h2>Update User Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">User Email:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

export default UpdatePasswordPage;
