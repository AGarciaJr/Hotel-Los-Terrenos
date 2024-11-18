import axios from "axios";

export default class serviceAPI {
    static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

    static async handleRequest(promise) {
        try {
            const response = await promise;
            return response.data;
        } catch (error) {
            if(error.response) {
                console.error('API request failed with status:', error.response.status);
                console.error('Error details:', error.response.data);
            } else {
                console.error('API request failed with status:', error.message);
            }
            throw error;
        }
    }

    static getHeader() {
        const token = localStorage.getItem("token");
        return token ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        } : {};
    }


    /**
     * Authentication
     */
    static async registerUser(registration) {
        return this.handleRequest(axios.post(`${this.BASE_URL}/auth/register`, registration));
    }

    static async loginUser(loginDetails) {
        return this.handleRequest(axios.post(`${this.BASE_URL}/auth/login`, loginDetails));
    }

    /**
     * User
     */
    static async getAllUsers() {
        return this.handleRequest(axios.get(`${this.BASE_URL}/users/all`, this.getHeader()));
    }

    static async getUserProfile() {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json"
            }
        });
        return response.data;
    }

    static async getUser(userId) {
        return this.handleRequest(axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, this.getHeader()));
    }

    static async getUserReservations(userId) {
        return this.handleRequest(axios.get(`${this.BASE_URL}/users/get-reservations/${userId}`, this.getHeader()));
    }

    static async deleteUser(userId) {
        return this.handleRequest(axios.delete(`${this.BASE_URL}/users/delete/${userId}`, this.getHeader()));
    }

    /**
     * Room
     */
    static async addRoom(formData) {
        return this.handleRequest(axios.post(`${this.BASE_URL}/rooms/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        }));
    }

    static async getAllAvailableRooms() {
        return this.handleRequest(axios.get(`${this.BASE_URL}/rooms/all-available-rooms`));
    }

    static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        return this.handleRequest(axios.get(`${this.BASE_URL}/rooms/available-rooms-by-date-and-type`, {
            params: { checkInDate, checkOutDate, roomType },
            ...this.getHeader()
        }));
    }

    static async getRoomTypes() {
        return this.handleRequest(axios.get(`${this.BASE_URL}/rooms/types`));
    }

    static async getAllRooms() {
        return this.handleRequest(axios.get(`${this.BASE_URL}/rooms/all`));
    }

    static async getRoomById(roomId) {
        return this.handleRequest(axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`));
    }

    static async deleteRoom(roomId) {
        return this.handleRequest(axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`));
    }

    static async updateRoom(roomId, formData) {
        return this.handleRequest(axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        }));
    }

    /**
     * Reservation
     */
    static async reserveRoom(roomId, userId, reservation) {
        return this.handleRequest(axios.post(`${this.BASE_URL}/reservations/reserve-room/${roomId}/${userId}`, reservation, this.getHeader()));
    }

    static async getAllReservations() {
        return this.handleRequest(axios.get(`${this.BASE_URL}/reservations/all`, this.getHeader()));
    }

    static async getReservationByConfirmationCode(reservationCode) {
        return this.handleRequest(axios.get(`${this.BASE_URL}/reservations/get-by-confirmation-code/${reservationCode}`));
    }

    static async cancelReservation(reservationId) {
        return this.handleRequest(axios.delete(`${this.BASE_URL}/reservations/cancel/${reservationId}`, this.getHeader()));
    }

    /**
     * Authentication Checking
     */
    static async logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static async isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token;
    }

    /**
     * Admin
     */
    static async isAdmin() {
        const role = localStorage.getItem("role");
        return role === "ADMIN";
    }

    static async updateUserPassword(userId, newPassword) {
        return this.handleRequest(axios.put(`${this.BASE_URL}/users/update-password/${userId}`, { password: newPassword }, this.getHeader()));
    }

    static async isClerk() {
        const role = localStorage.getItem("role");
        return role === "CLERK";
    }

    static async isUser() {
        const role = localStorage.getItem("role");
        return role === "USER";
    }
};
