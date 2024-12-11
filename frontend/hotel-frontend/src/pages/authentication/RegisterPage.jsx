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
    const [showCorporateInput, setShowCorporateInput] = useState(false);
    const [corporationName, setCorporationName] = useState('');

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
        phoneNumber: '',
        corporation: {
            id: ''
        }
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
            return 'USER';
        }
    };

    const handleCorporateIdChange = async (e) => {
        const corporateId = e.target.value;
        setFormData(prev => ({
            ...prev,
            corporation: {
                id: corporateId
            }
        }));

        if (corporateId) {
            try {
                const response = await serviceAPI.getCorporationById(corporateId);
                if (response.corporation) {
                    setCorporationName(response.corporation.name);
                } else {
                    setCorporationName('Corporation not found');
                }
            } catch (error) {
                setCorporationName('Invalid corporation ID');
            }
        } else {
            setCorporationName('');
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
            const submitData = {
                ...formData,
                role,
                corporation: showCorporateInput ? formData.corporation : null
            };

            const response = await serviceAPI.registerUser(submitData);

            if (response.statusCode === 200) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    corporation: { id: '' }
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

                {!isAdmin && showCorporateInput && (
                    <div className="form-group">
                        <label>Corporate ID:</label>
                        <input
                            type="text"
                            value={formData.corporation.id}
                            onChange={handleCorporateIdChange}
                            placeholder="Enter corporate ID (e.g., corp001)"
                        />
                        {corporationName && (
                            <p className="corporation-name">
                                Corporation: {corporationName}
                            </p>
                        )}
                    </div>
                )}

                <button type="submit">Register</button>
            </form>
            <p className="register-link">
                Already have an account? <a href="/login">Login</a>
            </p>
            <p className="corporate-link">
                {!isAdmin && <button
                    className="corporate-toggle"
                    onClick={() => setShowCorporateInput(!showCorporateInput)}
                >
                    {showCorporateInput ? 'Hide Corporate Options' : 'Click here if Corporate User'}
                </button>}
            </p>
        </div>
    );
}

export default RegisterPage;