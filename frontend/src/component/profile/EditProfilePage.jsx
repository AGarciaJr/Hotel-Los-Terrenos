import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import serviceAPI from '../../service/serviceAPI';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await serviceAPI.getUserProfile();
                setUser(response.user);
            }catch(error){
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if(!window.confirm('Delete your account?')){
            return;
        }
        try {
            await serviceAPI.deleteUser(user.id);
            navigate('/signup');
        }catch(error){
            setError(error.message);
        }
    };

    return (
        <div className='edit-profile-page'>
            <h2>Edit Profile</h2>
            {error && <p className='error-message'>{error}</p>}
            {user && (
                <div className='profile-details'>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <button className='delete-profile-button' onClick={handleDeleteProfile}Delete Profile></button>
                </div>
            )}
        </div>
    );
};

export default EditProfilePage;