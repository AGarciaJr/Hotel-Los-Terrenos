import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/rooms';

export const listRooms = () => axios.get(REST_API_BASE_URL);

export const createRoom = (room) => axios.post(REST_API_BASE_URL, room);

export const getRoom = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateRoom = (id, room) => axios.put(REST_API_BASE_URL + '/' + id, room);

export const deleteRoom = (id) => axios.delete(REST_API_BASE_URL + '/' + id);

// New endpoints for reservation functionality
export const checkRoomAvailability = (roomId) =>
    axios.get(`${REST_API_BASE_URL}/${roomId}/availability`);

export const makeReservation = (roomId, userId, reservationDetails) =>
    axios.post(`${REST_API_BASE_URL}/${roomId}/reserve/${userId}`, reservationDetails);

export const cancelReservation = (roomId, userId) =>
    axios.post(`${REST_API_BASE_URL}/${roomId}/cancel/${userId}`);

export const checkRoomReservations = (roomId) => {
    return axios.get(`${REST_API_BASE_URL}/${roomId}/check-reservations`);
};