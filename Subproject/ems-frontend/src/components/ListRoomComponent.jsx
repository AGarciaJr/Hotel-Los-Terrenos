import React, {useEffect, useState} from 'react'
import {deleteRoom, listRooms} from "../services/RoomService.js";
import {useNavigate} from "react-router-dom";

const ListRoomComponent = () => {


    const [rooms, setRooms] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllRooms();

    }, []);

    function getAllRooms() {
        listRooms().then((response) => {
            setRooms(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewRoom() {
        navigator('/add-room')
    }

    function updateRoom(id) {
        navigator(`/edit-room/${id}`)
    }

    function removeRoom(id) {
        console.log(id);
        deleteRoom(id).then((response) => {
            getAllRooms();
        }).catch(error => {
            console.error(error);
        });

    }

    return (
        <div className="container">

            <h2 className='text-center'>List of Rooms</h2>
            <button className='btn btn-primary mb-2' onClick={addNewRoom}>Add Room

            </button>
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th>Room ID</th>
                    <th>Room Type</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Booked?</th>
                    <th>UserId</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    rooms.map(room =>
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.roomType}</td>
                        <td>{room.roomPrice}</td>
                        <td>{room.roomDescription}</td>
                        <td>{room.booked ? "yes" : "no"}</td>
                        <td>{room.id}</td>
                        <td>
                            <button className= 'btn btn-info' onClick={() => updateRoom(room.id)}>Update</button>
                            <button className= 'btn btn-danger' onClick={() => removeRoom(room.id)}>Delete</button>
                        </td>
                        </tr>)
                }

                </tbody>
            </table>


        </div>
    )
}
export default ListRoomComponent
