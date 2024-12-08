import React, {useEffect, useState} from 'react'
import {createRoom, getRoom, updateRoom} from "../services/RoomService.js";
import {useNavigate, useParams} from "react-router-dom";

const RoomComponent = () => {

    {/*RoomType, roomPrice, description, booked, userID*/}
    const [roomType,setRoomType] = useState('');
    const [roomPrice, setRoomPrice] = useState('');
    const [roomDescription, setRoomDescription] = useState('');

    const [errors, setErrors] = useState({
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    })

    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getRoom(id).then((response) => {
                setRoomType(response.data.roomType);
                setRoomPrice(response.data.roomPrice);
                setRoomDescription(response.data.roomDescription);
            }).catch(error => {
                console.error(error);
            })
        }
    }, {id})

    function handleRoomType(e) {
        setRoomType(e.target.value);
    }

    function handleRoomPrice(e) {
        setRoomPrice(e.target.value);
    }

    function handleRoomDescription(e) {
        setRoomDescription(e.target.value);
    }

    function saveOfUpdateRoom(e){
        e.preventDefault();

        if (validateForm()) {

            const room = {roomType, roomPrice, roomDescription};
            console.log(room);
            if(id) {
                updateRoom(id, room).then((response) => {
                    console.log(response.data);
                    navigator('/rooms')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createRoom(room).then((response) => {
                    console.log(response.data);
                    navigator('/rooms');
                }).catch(error => {
                    console.error(error);
                });
            }




        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {... errors};

        if (roomType.trim()) {
            errorsCopy.roomType = '';
        } else {
           errorsCopy.roomType = 'Room Type is required.';
           valid = false;
        }

        if (roomPrice.trim()) {
            errorsCopy.roomPrice = '';
        } else {
            errorsCopy.roomPrice = 'Room price is required.';
            valid = false;
        }


        if (roomDescription.trim()) {
            errorsCopy.roomDescription = '';
        } else {
            errorsCopy.roomDescription = 'Room Description is required.';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;

    }

    function pageTitle() {
        if(id) {
            return <h2 className='text-center'>Update Room</h2>
        } else {
            return <h2 className='text-center'>Add Room</h2>
        }
    }

    return (
        <div className='container'>
                <div className='row'>
                    <div className='card shadow'>
                        {
                            pageTitle()
                        }
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Room Type</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Room Type'
                                        name='roomType'
                                        value={roomType}
                                        className={`form-control ${errors.roomType ? 'is-invalid' : ''}`}
                                        onChange={handleRoomType}>

                                    </input>
                                    {errors.roomType && <div className ="invalid-feedback">{errors.roomType}</div>}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Room Price</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Room Price'
                                        name='roomPrice'
                                        value={roomPrice}
                                        className={`form-control ${errors.roomPrice ? 'is-invalid' : ''}`}
                                        onChange={handleRoomPrice}>

                                    </input>
                                    {errors.roomPrice && <div className ="invalid-feedback">{errors.roomPrice}</div>}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Room Description</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Room Description'
                                        name='roomDescription'
                                        value={roomDescription}
                                        className={`form-control ${errors.roomDescription ? 'is-invalid' : ''}`}
                                        onChange={handleRoomDescription}>

                                    </input>
                                    {errors.roomDescription && <div className ="invalid-feedback">{errors.roomDescription}</div>}
                                </div>

                                <button className='btn btn-success' onClick={saveOfUpdateRoom}>Submit</button>

                            </form>

                        </div>
                    </div>
                </div>


            </div>
    )


}
export default RoomComponent
