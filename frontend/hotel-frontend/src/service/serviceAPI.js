import axios from "axios"

export default class serviceAPI{
    static BASE_URL = "http://localhost:8080"

    static getHeader() {
        const token = localStorage.getItem("token");

        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };
    }

    /**
     * Authentication
     */

    static async registerUser(registration){
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    static async loginUser(loginDetails){
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    /**
     * User
     */

    static async getAllUsers(){
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getUserProfile(){
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getUser(userId){
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getUserReservations(userId){
        const response = await axios.get(`${this.BASE_URL}/users/get-reservations/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async deleteUser(userId){
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /**
     * Room
     */

    static async addRoom(formData){
        const response = await axios.post(`${this.BASE_URL}/rooms/add-room`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    static async getAllAvailableRooms() {
        const response = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`)
        return response.data;
    }

    //come back and check this one
    static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        const result = await axios.get(`${this.BASE_URL}/rooms/available-rooms-by-date-and-type`, {
            params: { checkInDate, checkOutDate, roomType },
            headers: this.getHeader()
        });
        return result.data;
    }

    static async getRoomTypes(){
        const response = await axios.get(`${this.BASE_URL}/rooms/types`);
        return response.data;
    }

    static async getAllRooms(){
        const response = await axios.get(`${this.BASE_URL}/rooms/all`);
        return response.data;
    }

    static async getRoomById(roomId){
        const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`);
        return result.data;
    }

    //Come back to this: might need to change .delete to .get
    static async deleteRoom(roomId){
        const response = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`);
        return response.data;
    }

    static async updateRoom(roomId, formData){
        const result = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    /**
     * Reservtion
     */

    static async reserveRoom(roomId, userId, reservation) {
        try {
            console.log("USER ID:", userId);
            console.log("Request URL:", `${this.BASE_URL}/reservations/reserve-room/${roomId}/${userId}`);
            console.log("Headers:", this.getHeader());
            console.log("Reservation data:", reservation);

            const response = await axios.post(`${this.BASE_URL}/reservations/reserve-room/${roomId}/${userId}`, reservation, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            console.error("Reservation request failed:", error.response ? error.response.data : error.message);
            throw error;
        }
    }


    static async getAllReservations(){
        const result = await axios.get(`${this.BASE_URL}/reservations/all` ,{
            headers: this.getHeader()
        });
        return result.data;
    }

    static async getReservationByConfirmationCode(reservationCode){
        const result = await axios.get(`${this.BASE_URL}/reservations/get-by-confirmation-code/${reservationCode}`);
        return result.data;
    }

    static async cancelReservation(reservationId){
        const result = await axios.delete(`${this.BASE_URL}/reservations/cancel/${reservationId}`, {
            headers: this.getHeader()
        });
        return result.data;
    }

    /**
     * Authentication Checking
     */

    static async logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static async isAuthenticated(){
        const token = localStorage.getItem("token");
        return !!token;
    }

    static async isAdmin(){
        const role = localStorage.getItem("role");
        return role === "ADMIN";
    }

    /** Add isClerk */

    static async isUser(){
        const role = localStorage.getItem("role");
        return role === "USER";
    }
};