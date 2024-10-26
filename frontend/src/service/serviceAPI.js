import axios from "axios"

export default class serviceAPI{
    static BASE_URL = "http://localhost:8080"

    static getHeader() {
        const token = localStorage.getItem("token");
        
        return{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH */

    static async registerUser(registration){
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    static async loginUser(loginDetails){
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /** USERS */

    static async getAllUsers(){
        const response = await axios.post(`${this.BASE_URL}/users/all`,
            {
                headers: this.getHeader()
            })
            return response.data
    }

    static async getUserProfile(){
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUser(userId){
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserReservations(userId){
        const response = await axios.get(`${this.BASE_URL}/users/get-user-reservations/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async deleteUser(userId){
        const response = await axios.get(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /** ROOM */

    static async addRoom(formData){
        const response = await axios.get(`${this.BASE_URL}/rooms/add/`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data
    }

    static async getAllAvailableRooms(){
        const result = await axios.get(`${this.BASE_URL}/rooms/all-rooms-available`)
        return result.data
    }

    static async getAllAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType){
        const result = await axios.get(`${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
            &checkOutDate=${checkOutDate}&roomType=${roomType}`
        )
        return result.data
    }

    static async getRoomTypes(){
        const response = await axios.get(`${this.BASE_URL}/rooms/types`)
        return response.data
    }

    static async getAllRooms(){
        const response = await axios.get(`${this.BASE_URL}/rooms/all`)
        return response.data
    }


    static async getRoomById(roomId){
        const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`)
        return result.data
    }

    static async deleteRoom(roomId){
        const result = await axios.get(`${this.BASE_URL}/rooms/delete/${roomId}`, {
            headers: this.getHeader()
        })
        return result.data
    }

    static async updateRoom(roomId, formData){
        const result = await axios.get(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data
    }

    /** RESERVATION */

    static async reserveRoom(roomId, userId, reservation){
        console.log("USER ID IS: " + userId)

        const response = await axios.post(`${this.BASE_URL}/reservations/reserve-room/${roomId}/${userId}`, reservation,{
            headers: this.getHeader()
        })
        return response.data
    }

    static async getAllReservations(){
        const result = await axios.get(`${this.BASE_URL}/reservations/all`,{
            headers: this.getHeader()
        })
        return result.data
    }

    static async getReservationByConfirmationCode(reservationCode){
        const result = await axios.get(`${this.BASE_URL}/reservations/get-by-confirmation-code/${reservationCode}`)
        return result.data
    }

    static async cancelReservation(reservationId){
        const result = await axios.get(`${this.BASE_URL}/reservations/cancel/${reservationId}`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /** AUTHENTICATION CHECKER */

    static async logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static async isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static async isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static async isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
};