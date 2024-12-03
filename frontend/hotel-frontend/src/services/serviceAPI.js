import axios from "axios";

export default class serviceAPI {
    static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

    static async handleRequest(promise) {
        try {
            const response = await promise;
            return response.data;
        } catch (error) {
            console.error("API request failed: ", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    static getHeader() {
        const token = localStorage.getItem("token");
        if (!token) return {};
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
    }

    /**
     * Authentication
     */
    static async loginUser(loginDetails) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            return response.data;
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw error;
        }
    }


    static async registerUser(registrationDetails) {
        return this.handleRequest(axios.post(`${this.BASE_URL}/auth/register`, registrationDetails));
    }

    static async logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static async getUserProfile() {
        return this.handleRequest(axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, this.getHeader()));
    }

    static async isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token;
    }

    static async isAdmin() {
        const role = localStorage.getItem("role");
        return role === "ADMIN";
    }

    static async isClerk() {
        const role = localStorage.getItem("role");
        return role === "CLERK";
    }

    static async isUser() {
        const role = localStorage.getItem("role");
        return role === "USER";
    }

    /**
     * Rooms
     */
    static async getAllRooms() {
        return this.handleRequest(
            axios.get(`${this.BASE_URL}/rooms/all`, this.getHeader())
        );
    }

    static async getAllAvailableRooms() {
        console.log("Fetching all available rooms...");
        try {
            const response = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`);
            console.log("Rooms fetched successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching rooms:", error.response || error.message);
            throw error;
        }
    }

    static async getRoomById(roomId) {
        return this.handleRequest(axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`));
    }

    static async updateRoom(roomId, room) {
        const formData = new FormData();

        if (room.roomType) formData.append("roomType", room.roomType);
        if (room.roomPrice)formData.append("roomPrice", room.roomPrice);
        if (room.roomDescription) formData.append("roomDescription", room.roomDescription);

        return this.handleRequest(
            axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
        );
    }

    static async addRoom(roomDetails) {
        const formData = new FormData();

        formData.append("roomType", roomDetails.roomType);
        formData.append("roomPrice", roomDetails.roomPrice);
        formData.append("roomDescription", roomDetails.roomDescription);


        return this.handleRequest(
            axios.post(`${this.BASE_URL}/rooms/add`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
        );
    }


    /**
     * Reservations
     */

    static async reserveRoom(roomId, userId, reservation) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/reservations/reserve-room/${roomId}/${userId}`,
                reservation,
                this.getHeader()
            );
            return response.data;
        } catch (error) {
            console.error('Reservation request failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    static async getUserReservations(userId) {
        return this.handleRequest(
            axios.get(`${this.BASE_URL}/users/get-user-reservations/${userId}`, this.getHeader())
        );
    }

    static async getReservationByConfirmationCode(reservationCode) {
        return this.handleRequest(axios.get(`${this.BASE_URL}/reservations/get-by-confirmation-code/${reservationCode}`));
    }

    static async cancelReservation(reservationId) {
        return this.handleRequest(axios.delete(`${this.BASE_URL}/reservations/cancel-reservation/${reservationId}`, this.getHeader()));
    }
}
