import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/users';

export const listUsers = () => axios.get(REST_API_BASE_URL);

export const createUser = (user) => axios.post(REST_API_BASE_URL,user);

export const getUser = (userId) => axios.get(REST_API_BASE_URL + '/' + userId);

export const checkPhoneExists = (phone) => axios.get(`${REST_API_BASE_URL}/check-phone/${phone}`);

export const deleteUser = (userId) => axios.delete(REST_API_BASE_URL + '/' + userId);