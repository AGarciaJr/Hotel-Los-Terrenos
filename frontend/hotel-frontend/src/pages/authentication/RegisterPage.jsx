import React, {useEffect, useState} from 'react';
import serviceAPI from '../../services/serviceAPI';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isClerk, setIsClerk] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const auth = await serviceAPI.isAuthenticated();
            const admin = await serviceAPI.isAdmin();
            const clerk = await serviceAPI.isClerk();

            setIsAuthenticated(auth);
            setIsAdmin(admin);
            setIsClerk(clerk);
        }
        checkAuth();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        if (!name || !email || !password || !phoneNumber) {
            return false;
        }
        return true;
    };

    const getRoleFromEmail = (email) => {
        if (email.includes('_admin@')) {
            return 'ADMIN';
        } else if (email.includes('_clerk@')) {
            return 'CLERK';
        } else {
            return 'USER'; // Default role
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Please fill all the fields.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        setIsLoading(true);
        const role = getRoleFromEmail(formData.email);

        try {
            const response = await serviceAPI.registerUser({ ...formData, role });

            if (response.statusCode === 200) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: ''
                });
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const LoadingOverlay = () => (
        <div className="loading-overlay">
            <div className="loading-content">
                <img
                    src="/hotel-images/Hotel-Loading-Animation.gif"
                    alt="Loading..."
                    className="loading-gif"
                />
                <p>Processing your request...</p>
            </div>
        </div>
    );

    return (
        <div className="auth-container">
            {isLoading && <LoadingOverlay />}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            { !isAuthenticated && <h2>Sign Up</h2>}
            { isClerk && <h2>Create a Guest Account</h2>}
            { isAdmin && <h2>Create a Clerk Account</h2>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p className="register-link">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default RegisterPage;