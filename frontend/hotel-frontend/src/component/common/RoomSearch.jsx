import React, {useState, useEffect} from "react";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import serviceAPI from '../../service/serviceAPI';
import DatePicker from "react-datepicker";

const RoomSearch = ({handleSearchResult}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomType, setRoomType] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchRoomTypes = async () => {
            try {
                const types = await serviceAPI.getRoomTypes();
                setRoomTypes(types)
            }catch(err){
                console.log('Error fetching room types:',err.message);
            }
        };
        fetchRoomTypes();
    }, []);

    const showError = (message, timeOut = 5000) =>{
        setError(message);
        setTimeout(()=>{
            setError('');
        }, timeOut);
    };

    const handleIternalSearch = async () => {
        if(!startDate || !endDate || !roomType){
            showError("please select all fields");
            return false;
        }
        try{
            const formattedStartDate = startDate ? startDate.roISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.roISOString().split('T')[0] : null;

            const response = await serviceAPI.getAllAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

            if(response.setStatusCode === 200){
                if(response.roomList.length === 0){
                    showError("Room Not Currently Available for selected Room Type and Date Range");
                    return;
                }

                handleSearchResult(response.roomList);
                setError('');
            }

        }catch(err){
            showError(err.response.data.message);
        }
    };

    return(
        <section>
            <div className="search-container">
                <div className="search-field">
                    <label>Check-in Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Check-in Date"
                    />
                </div>
                <div className="search-field">
                    <label>Check-out Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Check-out Date"
                    />
                </div>

                <div className="search-field">
                    <label>Room Type</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                        <option disabled value="">
                            Select Room Type
                        </option>
                        {roomTypes.map((roomType =>
                                <option key={roomType} value={roomType}>
                                    {roomType}
                                </option>
                        ))}
                    </select>
                </div>
                <button className="home-search-button" onClick={handleIternalSearch}>
                    Search Rooms
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </section>
    );
};

export default RoomSearch;