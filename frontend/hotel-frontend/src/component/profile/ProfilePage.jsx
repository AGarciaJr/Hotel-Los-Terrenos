/*import React, { useState, useEffect } from "react";
import serviceAPI from "../../service/serviceAPI";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '2rem auto',
            padding: '20px',
            backgroundColor: '#ffffff',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '4px',
            color: '#000000'
        },
        subtitle: {
            fontSize: '18px',
            marginBottom: '24px',
            color: '#FF0000'
        },
        label: {
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '4px',
            color: '#FF0000'
        },
        value: {
            fontSize: '16px',
            marginBottom: '16px',
            color: '#000000'
        },
        input: {
            width: '100%',
            padding: '8px',
            border: '2px solid #FF0000',
            borderRadius: '4px',
            marginBottom: '16px'
        },
        button: {
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
        },
        cancelButton: {
            backgroundColor: '#CCCCCC',
            color: '#000000',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await serviceAPI.getUserProfile();
                if (response.data) {
                    setProfile(response.data);
                    setFormData(response.data);
                } else {
                    setError(response.message || "Failed to load profile");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                if (err.response?.status === 401) {
                    navigate('/login');
                } else {
                    setError("Failed to load profile. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setFormData(profile);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError(null);

            const updateData = {
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                email: profile.email
            };

            const response = await serviceAPI.updateUserProfile(updateData);

            if (response.statusCode === 200 && response.user) {
                setProfile(response.user);
                setIsEditing(false);
            } else {
                setError(response.message || "Failed to update profile");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setError("Failed to update profile. Please try again.");
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div style={styles.container}>
                <p style={{ textAlign: 'center' }}>Loading profile...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Guest Profile</h1>
            <h2 style={styles.subtitle}>Hotel Los Terrenos</h2>

            {error && <div style={{ color: '#FF0000', marginBottom: '16px' }}>{error}</div>}

            {isEditing ? (
                <div>
                    <div>
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>

                    <div>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            disabled
                            style={{...styles.input, backgroundColor: '#f5f5f5'}}
                        />
                    </div>

                    <div>
                        <label style={styles.label}>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber || ""}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>

                    <div>
                        <button
                            onClick={handleSave}
                            style={{...styles.button, opacity: isSaving ? 0.7 : 1}}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            onClick={toggleEdit}
                            style={styles.cancelButton}
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <p style={styles.label}>Name</p>
                        <p style={styles.value}>{profile?.name}</p>
                    </div>

                    <div>
                        <p style={styles.label}>Email</p>
                        <p style={styles.value}>{profile?.email}</p>
                    </div>

                    <div>
                        <p style={styles.label}>Phone Number</p>
                        <p style={styles.value}>{profile?.phoneNumber}</p>
                    </div>

                    <button onClick={toggleEdit} style={styles.button}>
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;*/

import React, { useState } from "react";
/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../../service/serviceAPI";
*/

const ProfilePage = () => {
    // Mock profile data
    const [profile, setProfile] = useState({
        username: "jsmith",
        name: "John Smith",
        email: "john.smith@example.com",
        phoneNumber: "123-456-7890",
        role: "GUEST"
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(profile);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [passwordError, setPasswordError] = useState("");
    const [saveMessage, setSaveMessage] = useState("");
/*
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
*/
    const styles = {
        container: {
            maxWidth: '500px',
            margin: '2rem auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '4px',
            color: '#000000'
        },
        subtitle: {
            fontSize: '18px',
            marginBottom: '24px',
            color: '#FF0000'
        },
        label: {
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '4px',
            color: '#FF0000'
        },
        value: {
            fontSize: '16px',
            marginBottom: '16px',
            color: '#000000',
            padding: '8px',
            backgroundColor: '#f8f8f8',
            borderRadius: '4px'
        },
        input: {
            width: '100%',
            padding: '8px',
            border: '2px solid #FF0000',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '16px'
        },
        button: {
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px',
            fontSize: '16px'
        },
        secondaryButton: {
            backgroundColor: '#444444',
            color: '#FFFFFF',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px',
            fontSize: '16px'
        },
        cancelButton: {
            backgroundColor: '#CCCCCC',
            color: '#000000',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
        },
        section: {
            marginBottom: '24px'
        },
        divider: {
            borderTop: '2px solid #f0f0f0',
            margin: '24px 0'
        },
        errorText: {
            color: '#FF0000',
            marginBottom: '16px',
            fontSize: '14px'
        },
        saveMessage: {
            padding: '8px',
            marginBottom: '16px',
            borderRadius: '4px',
            backgroundColor: '#e6ffe6',
            color: '#006600',
            textAlign: 'center'
        }
    };
/*
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const response = await serviceAPI.getUserProfile();
            if (response.statusCode === 200 && response.user) {
                setProfile(response.user);
                setFormData(response.user);
            } else {
                setError(response.message || "Failed to load profile");
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setError("Failed to load profile. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };*/

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSaveMessage("");
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        setPasswordError("");
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setFormData(profile);
        }
        setSaveMessage("");
    };

    const togglePasswordChange = () => {
        setIsChangingPassword(!isChangingPassword);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setPasswordError("");
    };

    const handleSave = () => {
        if (!formData.name || !formData.phoneNumber) {
            setSaveMessage("Please fill in all required fields");
            return;
        }

        setProfile(formData);
        setIsEditing(false);
        setSaveMessage("Profile updated successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSaveMessage("");
        }, 3000);
    };
/*
    const handleSave = async () => {
        try {
            setIsSaving(true);

            const updateData = {
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                email: profile.email
            };

            const response = await serviceAPI.updateUserProfile(updateData);

            if (response.statusCode === 200 && response.user) {
                setProfile(response.user);
                setIsEditing(false);
            } else {
                setError(response.message || "Failed to update profile");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };*/

    const handlePasswordChange = () => {
        // Validate password change
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError("New passwords do not match");
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return;
        }

        // Mock successful password change
        setPasswordError("");
        setIsChangingPassword(false);
        setSaveMessage("Password changed successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSaveMessage("");
        }, 3000);
    };
/*
    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError("New passwords do not match");
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return;
        }

        try {
            setIsSaving(true);

            const updateData = {
                password: passwordData.newPassword,
                email: profile.email
            };

            const response = await serviceAPI.updateUserProfile(updateData);

            if (response.statusCode === 200) {
                setIsChangingPassword(false);
                alert("Password changed successfully!");
            } else {
                setPasswordError(response.message || "Failed to change password");
            }
        } catch (err) {
            console.error("Error changing password:", err);
            setPasswordError("Failed to change password. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div style={styles.container}>
                <p style={{ textAlign: 'center' }}>Loading profile...</p>
            </div>
        );
    }*/

    return (
        <div style={styles.container}>
            <div style={styles.section}>
                <h1 style={styles.title}>Guest Profile</h1>
                <h2 style={styles.subtitle}>Hotel Los Terrenos</h2>
            </div>

            {saveMessage && (
                <div style={styles.saveMessage}>
                    {saveMessage}
                </div>
            )}

            {isEditing ? (
                <div>
                    <div style={styles.section}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username || ""}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            disabled
                            style={{...styles.input, backgroundColor: '#f5f5f5'}}
                        />
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber || ""}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.section}>
                        <button
                            onClick={handleSave}
                            style={styles.button}
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={toggleEdit}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={styles.section}>
                        <p style={styles.label}>Username</p>
                        <p style={styles.value}>{profile.username}</p>
                    </div>

                    <div style={styles.section}>
                        <p style={styles.label}>Name</p>
                        <p style={styles.value}>{profile.name}</p>
                    </div>

                    <div style={styles.section}>
                        <p style={styles.label}>Email</p>
                        <p style={styles.value}>{profile.email}</p>
                    </div>

                    <div style={styles.section}>
                        <p style={styles.label}>Phone Number</p>
                        <p style={styles.value}>{profile.phoneNumber}</p>
                    </div>

                    <div style={styles.section}>
                        <p style={styles.label}>Account Type</p>
                        <p style={styles.value}>{profile.role}</p>
                    </div>

                    <button onClick={toggleEdit} style={styles.button}>
                        Edit Profile
                    </button>
                </div>
            )}

            <div style={styles.divider}></div>

            {!isChangingPassword ? (
                <div style={styles.section}>
                    <button
                        onClick={togglePasswordChange}
                        style={styles.secondaryButton}
                    >
                        Change Password
                    </button>
                </div>
            ) : (
                <div>
                    <h3 style={{...styles.title, fontSize: '20px', marginBottom: '16px'}}>
                        Change Password
                    </h3>

                    {passwordError && (
                        <p style={styles.errorText}>{passwordError}</p>
                    )}

                    <div style={styles.section}>
                        <label style={styles.label}>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordInputChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInputChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInputChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.section}>
                        <button
                            onClick={handlePasswordChange}
                            style={styles.button}
                        >
                            Update Password
                        </button>
                        <button
                            onClick={togglePasswordChange}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;