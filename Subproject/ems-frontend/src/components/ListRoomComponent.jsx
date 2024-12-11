import React, { useEffect, useState } from 'react';
import { deleteRoom, listRooms, checkRoomReservations } from "../services/RoomService.js";
import { useNavigate } from "react-router-dom";
import WarningModal from './WarningModal';

const ListRoomComponent = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [hasReservations, setHasReservations] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        getAllRooms();
    }, []);

    function getAllRooms() {
        listRooms()
            .then((response) => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function addNewRoom() {
        navigator('/add-room');
    }

    function updateRoom(id) {
        navigator(`/edit-room/${id}`);
    }

    async function handleDeleteClick(room) {
        setSelectedRoom(room);
        try {
            const response = await checkRoomReservations(room.id);
            setHasReservations(response.data.hasReservations);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error checking reservations:', error);
        }
    }

    function confirmDelete() {
        if (selectedRoom) {
            deleteRoom(selectedRoom.id)
                .then(() => {
                    getAllRooms();
                    setIsModalOpen(false);
                    setSelectedRoom(null);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    function makeReservation(roomId) {
        navigator(`/make-reservation/${roomId}`);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Available Rooms</h2>
                <button
                    onClick={addNewRoom}
                    className="bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    + Add Room
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                    <div
                        key={room.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {room.roomType} - Room {room.roomNumber}
                                    </h3>
                                    <p className="text-2xl font-bold text-blue-600">
                                        ${room.roomPrice}/night
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Quality: {room.qualityLevel}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Bed: {room.bedType}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {room.smokingStatus ? 'Smoking Allowed' : 'Non-Smoking'}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    room.booked
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {room.booked ? 'Booked' : 'Available'}
                                </span>
                            </div>

                            <p className="text-gray-600 mb-4">
                                {room.roomDescription}
                            </p>

                            <div className="flex justify-end gap-2">
                                {!room.booked && (
                                    <button
                                        onClick={() => makeReservation(room.id)}
                                        className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                                    >
                                        Reserve
                                    </button>
                                )}
                                <button
                                    onClick={() => updateRoom(room.id)}
                                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(room)}
                                    className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <WarningModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedRoom(null);
                }}
                onConfirm={confirmDelete}
                hasReservations={hasReservations}
            />
        </div>
    );
};

export default ListRoomComponent;