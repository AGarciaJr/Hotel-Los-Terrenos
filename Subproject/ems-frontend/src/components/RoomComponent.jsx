import React, { useEffect, useState } from 'react';
import { createRoom, getRoom, updateRoom } from "../services/RoomService.js";
import { useNavigate, useParams } from "react-router-dom";

const RoomComponent = () => {
    const [roomDetails, setRoomDetails] = useState({
        roomNumber: '',
        roomType: '',
        qualityLevel: '',
        bedType: '',
        smokingStatus: false,
        roomPrice: '',
        roomDescription: '',
        booked: false,
        userId: null
    });

    const [errors, setErrors] = useState({
        roomNumber: '',
        roomType: '',
        qualityLevel: '',
        bedType: '',
        roomPrice: '',
        roomDescription: ''
    });

    const navigator = useNavigate();
    const { id } = useParams();

    const roomTypes = ['Nature Retreat', 'Urban Elegance', 'Vintage Charm'];
    const qualityLevels = ['executive', 'business', 'comfort', 'economy'];
    const bedTypes = ['twin', 'full', 'queen', 'king'];

    useEffect(() => {
        if (id) {
            getRoom(id).then((response) => {
                setRoomDetails(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRoomDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = {};

        if (!roomDetails.roomNumber) {
            errorsCopy.roomNumber = 'Room Number is required';
            valid = false;
        }

        if (!roomDetails.roomType) {
            errorsCopy.roomType = 'Room Type is required';
            valid = false;
        }

        if (!roomDetails.qualityLevel) {
            errorsCopy.qualityLevel = 'Quality Level is required';
            valid = false;
        }

        if (!roomDetails.bedType) {
            errorsCopy.bedType = 'Bed Type is required';
            valid = false;
        }

        if (!roomDetails.roomPrice) {
            errorsCopy.roomPrice = 'Room Price is required';
            valid = false;
        } else if (isNaN(roomDetails.roomPrice) || roomDetails.roomPrice <= 0) {
            errorsCopy.roomPrice = 'Room Price must be a positive number';
            valid = false;
        }

        if (!roomDetails.roomDescription) {
            errorsCopy.roomDescription = 'Room Description is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const roomData = {
                ...roomDetails,
                roomPrice: parseFloat(roomDetails.roomPrice)
            };

            if (id) {
                updateRoom(id, roomData)
                    .then(() => navigator('/rooms'))
                    .catch(error => console.error(error));
            } else {
                createRoom(roomData)
                    .then(() => navigator('/rooms'))
                    .catch(error => console.error(error));
            }
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='card shadow'>
                    <h2 className='text-center'>{id ? 'Update Room' : 'Add Room'}</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Room Number</label>
                                <input
                                    type='number'
                                    name='roomNumber'
                                    value={roomDetails.roomNumber}
                                    onChange={handleChange}
                                    className={`form-control ${errors.roomNumber ? 'is-invalid' : ''}`}
                                    placeholder='Enter Room Number'
                                />
                                {errors.roomNumber && <div className="invalid-feedback">{errors.roomNumber}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Room Type</label>
                                <select
                                    name='roomType'
                                    value={roomDetails.roomType}
                                    onChange={handleChange}
                                    className={`form-control ${errors.roomType ? 'is-invalid' : ''}`}
                                >
                                    <option value="">Select Room Type</option>
                                    {roomTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.roomType && <div className="invalid-feedback">{errors.roomType}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Quality Level</label>
                                <select
                                    name='qualityLevel'
                                    value={roomDetails.qualityLevel}
                                    onChange={handleChange}
                                    className={`form-control ${errors.qualityLevel ? 'is-invalid' : ''}`}
                                >
                                    <option value="">Select Quality Level</option>
                                    {qualityLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                {errors.qualityLevel && <div className="invalid-feedback">{errors.qualityLevel}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Bed Type</label>
                                <select
                                    name='bedType'
                                    value={roomDetails.bedType}
                                    onChange={handleChange}
                                    className={`form-control ${errors.bedType ? 'is-invalid' : ''}`}
                                >
                                    <option value="">Select Bed Type</option>
                                    {bedTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.bedType && <div className="invalid-feedback">{errors.bedType}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Room Price</label>
                                <input
                                    type='number'
                                    name='roomPrice'
                                    value={roomDetails.roomPrice}
                                    onChange={handleChange}
                                    className={`form-control ${errors.roomPrice ? 'is-invalid' : ''}`}
                                    placeholder='Enter Room Price'
                                />
                                {errors.roomPrice && <div className="invalid-feedback">{errors.roomPrice}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Room Description</label>
                                <textarea
                                    name='roomDescription'
                                    value={roomDetails.roomDescription}
                                    onChange={handleChange}
                                    className={`form-control ${errors.roomDescription ? 'is-invalid' : ''}`}
                                    placeholder='Enter Room Description'
                                    rows="3"
                                />
                                {errors.roomDescription && <div className="invalid-feedback">{errors.roomDescription}</div>}
                            </div>

                            <div className='form-check mb-3'>
                                <input
                                    type='checkbox'
                                    name='smokingStatus'
                                    checked={roomDetails.smokingStatus}
                                    onChange={handleChange}
                                    className='form-check-input'
                                    id='smokingStatus'
                                />
                                <label className='form-check-label' htmlFor='smokingStatus'>
                                    Smoking Allowed
                                </label>
                            </div>

                            <button className='btn btn-success' onClick={handleSubmit}>
                                {id ? 'Update' : 'Save'} Room
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomComponent;