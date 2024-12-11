import React, { useEffect, useState } from 'react';
import { createUser, getUser, checkPhoneExists } from '../services/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import { listCorporations, validateCorporateId } from '../services/CorporationService';

const AdminUserComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [corporateId, setCorporateId] = useState('');
    const [corporation, setCorporation] = useState('');
    const [company, setCompany] = useState('Not Applicable');
    const [corporations, setCorporations] = useState({});
    const [isPhoneChecking, setIsPhoneChecking] = useState(false);
    const { id } = useParams();
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        corporateId: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        listCorporations()
            .then(response => {
                const corpData = {};
                response.data.forEach(corp => {
                    corpData[corp.id] = corp.corporationName;
                });
                setCorporations(corpData);
            })
            .catch(error => {
                console.error('Error fetching corporations:', error);
            });

        if(id) {
            getUser(id).then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setPhone(response.data.phone);
                setRole(response.data.role);
                if(response.data.company !== 'Not Applicable') {
                    const [corpId, corpName] = response.data.company.split(' - ');
                    setCorporateId(corpId);
                    setCorporation(corpName);
                }
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
        if(selectedRole === 'Guest') {
            setCompany('Not Applicable');
            setCorporateId('');
            setCorporation('');
        }
    };

    const handlePhoneChange = (e) => {
        const inputPhone = e.target.value;
        setPhone(inputPhone);
    };

    const handleCorporateIdChange = (e) => {
        const inputId = e.target.value.toUpperCase();
        setCorporateId(inputId);

        if(inputId.trim()) {
            validateCorporateId(inputId)
                .then(response => {
                    setCorporation(response.data.corporationName);
                    setCompany(`${inputId} - ${response.data.corporationName}`);
                    setErrors(prev => ({...prev, corporateId: ''}));
                })
                .catch(error => {
                    setCorporation('');
                    setCompany('');
                    setErrors(prev => ({...prev, corporateId: 'Invalid Corporate ID'}));
                });
        } else {
            setCorporation('');
            setCompany('');
            setErrors(prev => ({...prev, corporateId: ''}));
        }
    };

    async function saveUser(e) {
        e.preventDefault();

        const isValid = await validateForm();
        if(isValid) {
            const user = {
                name,
                email,
                password,
                phone,
                role,
                company: role === 'Corporate Guest' ? `${corporateId} - ${corporation}` : 'Not Applicable'
            };
            console.log(user);

            createUser(user).then((response) => {
                console.log(response.data);
                navigator('/users');
            }).catch(error => {
                console.error('Error creating user:', error);
            });
        }
    }
    async function validateForm() {
        let valid = true;
        const errorsCopy = {...errors};

        if(name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is Required';
            valid = false;
        }

        if(email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is Required';
            valid = false;
        }

        if(password.trim()) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = 'Password is Required';
            valid = false;
        }

        if(!phone.trim()) {
            errorsCopy.phone = 'Phone is Required';
            valid = false;
        }

        if(role.trim()) {
            errorsCopy.role = '';
        } else {
            errorsCopy.role = 'Role is Required';
            valid = false;
        }

        if(role === 'Corporate Guest') {
            if(!corporateId.trim() || !corporation) {
                errorsCopy.corporateId = 'Valid Corporate ID is Required';
                valid = false;
            } else {
                errorsCopy.corporateId = '';
            }
        }

        setErrors(errorsCopy);

        if(valid && phone.trim()) {
            try {
                const response = await checkPhoneExists(phone);
                if(response.data) {
                    setErrors(prev => ({
                        ...prev,
                        phone: 'This phone number is already registered'
                    }));
                    return false;
                }
            } catch(error) {
                console.error('Error checking phone:', error);
                setErrors(prev => ({
                    ...prev,
                    phone: 'Error validating phone number'
                }));
                return false;
            }
        }

        return valid;
    }

    function pageTitle() {
        return <h2 className='text-center'>{id ? 'Update User' : 'Add User'}</h2>;
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Full Name'
                                    name='Name'
                                    value={name}
                                    className={`form-control ${errors.name ? 'is-invalid': ''}`}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter User Email'
                                    name='Email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid': ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Password:</label>
                                <input
                                    type='password'
                                    placeholder='Enter User Password'
                                    name='Password'
                                    value={password}
                                    className={`form-control ${errors.password ? 'is-invalid': ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Phone Number:</label>
                                <input
                                    type='text'
                                    placeholder='Enter User Phone Number'
                                    name='Phone'
                                    value={phone}
                                    className={`form-control ${errors.phone ? 'is-invalid': ''}`}
                                    onChange={handlePhoneChange}
                                    disabled={isPhoneChecking}
                                />
                                {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                                {isPhoneChecking && <small className="text-muted">Checking phone number...</small>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Role:</label>
                                <select
                                    name='role'
                                    value={role}
                                    className={`form-control ${errors.role ? 'is-invalid': ''}`}
                                    onChange={handleRoleChange}
                                >
                                    <option value='' disabled>Select Role</option>
                                    <option value='Guest'>Guest</option>
                                    <option value='Corporate Guest'>Corporate Guest</option>
                                </select>
                                {errors.role && <div className='invalid-feedback'>{errors.role}</div>}
                            </div>

                            {role === 'Corporate Guest' && (
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Corporate ID:</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Corporate ID (e.g., CORP001)'
                                        name='corporateId'
                                        value={corporateId}
                                        className={`form-control ${errors.corporateId ? 'is-invalid': ''}`}
                                        onChange={handleCorporateIdChange}
                                    />
                                    {errors.corporateId && <div className='invalid-feedback'>{errors.corporateId}</div>}
                                    {corporation && (
                                        <div className='form-text text-success'>
                                            Corporation: {corporation}
                                        </div>
                                    )}
                                </div>
                            )}

                            <button className='btn btn-success' onClick={saveUser}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserComponent;