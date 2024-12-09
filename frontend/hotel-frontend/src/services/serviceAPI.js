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
        if (!token) {
            console.warn("No token found in localStorage");
            return {};
        }
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
        try {
            const response = await axios.get(
                `${this.BASE_URL}/users/get-logged-in-profile-info`,
                this.getHeader()
            );
            console.log("Full API Response:", response.data);  // Log the full response
            return response.data;
        } catch (error) {
            console.error("getUserProfile error:", error);
            throw error;
        }
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

    static async getUserById(userId){
        return this.handleRequest(
            axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, this.getHeader())
        );
    }

    static async getUserByPhoneNumber(phoneNumber) {
        console.log(this.getHeader());
        return this.handleRequest(
            axios.get(`${this.BASE_URL}/users/get-by-phone/${phoneNumber}`, this.getHeader())
        );
    }

    static async updateUserById(userId, userDetails) {
        return this.handleRequest(
            axios.put(`${this.BASE_URL}/users/update/${userId}`, userDetails, this.getHeader())
        );
    }


    static async getAllGuests() {
        return this.handleRequest(
            axios.get(`${this.BASE_URL}/users/all`, this.getHeader())
        );
    }

    static async updateUserDetails(userId, userDetails) {
        if (!userId) throw new Error("User ID is required for updating user details.");

        console.log("Updating user with ID:", userId);
        console.log("Update data:", userDetails);

        return this.handleRequest(
            axios.put(
                `${this.BASE_URL}/users/update-user-info/${userId}`,
                userDetails,
                this.getHeader()
            )
        );
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
            const response = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`, this.getHeader());
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
        if (room.roomPrice) formData.append("roomPrice", room.roomPrice);
        if (room.roomDescription) formData.append("roomDescription", room.roomDescription);
        if (room.qualityLevel) formData.append("qualityLevel", room.qualityLevel);
        if (room.bedType) formData.append("bedType", room.bedType);
        if (room.smokingStatus !== undefined) formData.append("smokingStatus", room.smokingStatus);

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

        formData.append("roomNumber", roomDetails.roomNumber);
        formData.append("roomType", roomDetails.roomType);
        formData.append("roomPrice", roomDetails.roomPrice);
        formData.append("qualityLevel", roomDetails.qualityLevel);
        formData.append("bedType", roomDetails.bedType);
        formData.append("smokingStatus", roomDetails.smokingStatus);
        formData.append("roomDescription", roomDetails.roomDescription);



        return this.handleRequest(
            axios.post(`${this.BASE_URL}/rooms/add`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                }
            })
        )
    }


    /**
     * Floors
     */

    static async addNewFloor(floorData) {
        const formData = new FormData();

        formData.append("floorName", floorData.name);
        formData.append("floorTheme", floorData.theme);
        formData.append("floorNumber", floorData.number);
        formData.append("roomTypes", floorData.types.split(",").map(type => type.trim()));

        return this.handleRequest(
            axios.post(`${this.BASE_URL}/floors/add`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
        );
    }

    static async getAllFloors() {
        return this.handleRequest(
            axios.get(`${this.BASE_URL}/floors/all`, this.getHeader())
        );
    }

    static async getRoomsByFloor(floorId) {
        return this.handleRequest(
            axios.get(`${this.BASE_URL}/floors/get-floor-rooms/${floorId}`, this.getHeader())
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
            axios.get(`${this.BASE_URL}/users/get-user-reservations/${userId}?status=BOOKED`, this.getHeader())
        );
    }

    static async getReservationByConfirmationCode(reservationCode) {
        console.log(reservationCode)
        return this.handleRequest(axios.get(`${this.BASE_URL}/reservations/get-by-confirmation-code/${reservationCode}`));
    }

    static async checkInReservation(reservationId) {
        return this.handleRequest(
            axios.post(`${this.BASE_URL}/reservations/checkin/${reservationId}`, null, this.getHeader())
        );
    }

    static async checkOutReservation(reservationId) {
        return this.handleRequest(
            axios.post(`${this.BASE_URL}/reservations/checkout/${reservationId}`, null, this.getHeader())
        );
    }

    static async cancelReservation(reservationId) {
        return this.handleRequest(
            axios.delete(`${this.BASE_URL}/reservations/cancel/${reservationId}`, this.getHeader())
        );
    }


    static async getAllReservations() {
        return this.handleRequest(
            axios.get(`${this.BASE_URL}/reservations/all`, this.getHeader())
        );
    }

    static async updateReservation(reservationCode, reservation) {
        return this.handleRequest(
            axios.put(
                `${this.BASE_URL}/reservations/update-by-confirmation-code/${reservationCode}`,
                reservation,
                this.getHeader()
            )
        );
    }


}
