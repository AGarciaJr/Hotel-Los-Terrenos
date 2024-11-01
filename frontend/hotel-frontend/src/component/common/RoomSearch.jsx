import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import serviceAPI from "../../service/serviceAPI";

const RoomSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomType, setRoomType] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await serviceAPI.getRoomTypes();
                setRoomTypes(types);
            } catch (err) {
                console.log('Error fetching room types:', err.message);
            }
        };
        fetchRoomTypes();
    }, []);

    const showError = (message, timeOut = 5000) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, timeOut);
    };

    const handleSearch = async () => {
        if (!startDate || !endDate || !roomType) {
            showError("Please select all fields");
            return;
        }

        try {
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];

            console.log("Formatted Dates:", { formattedStartDate, formattedEndDate, roomType }); // Debugging log
            const response = await serviceAPI.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

            if (response.roomList && response.roomList.length === 0) {
                showError("Room Not Currently Available for selected Room Type and Date Range");
                return;
            }
            handleSearchResult(response.roomList);
            setError('');
        } catch (err) {
            console.error("Error during room search:", err); // Full error log
            showError(err.response?.data?.message || "Error occurred during room search.");
        }
    };

    return (
        <section>
            <div className="search-container">
                <div className="search-field">
                    <label>Check-in Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat={"yyyy/MM/dd"}
                        placeholderText="Select Check-in Date"
                    />
                </div>
                <div className="search-field">
                    <label>Check-out Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat={"yyyy/MM/dd"}
                        placeholderText="Select Check-out Date"
                    />
                </div>

                <div className="search-field">
                    <label>Room Type</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                        <option disabled value="">
                            Select Room Type
                        </option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="home-search-button" onClick={handleSearch}>
                    Search Rooms
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </section>
    );
};

export default RoomSearch;
