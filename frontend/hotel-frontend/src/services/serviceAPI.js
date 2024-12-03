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

    static async getReservationByConfirmationCode(reservationCode) {
        return this.handleRequest(axios.get(`${this.BASE_URL}/reservations/get-by-confirmation-code/${reservationCode}`));
    }
}
