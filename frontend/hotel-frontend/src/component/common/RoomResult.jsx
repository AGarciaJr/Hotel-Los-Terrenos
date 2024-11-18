import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../../service/serviceAPI";

const RoomResult = ({roomSearchResults}) => {
    const navigate = useNavigate();
    const [isClerk, setIsClerk] = useState(false);

    useEffect(() => {
        const checkClerkStatus = async () => {
            const clerkStatus = await serviceAPI.isClerk();
            setIsClerk(clerkStatus);
        };
        checkClerkStatus();
    }, []);

    return (
        <section className="room-results">
            {roomSearchResults && roomSearchResults.length > 0 && (
                <div className="room-list">
                    {roomSearchResults.map(room => (
                        <div key={room.id} className="room-list-item">
                            <img className="room-list-item-image" src={room.roomPhotoUrl} alt={room.roomType} />
                            <div className="room-details">
                                <h3>{room.roomType}</h3>
                                <p>Price: ${room.roomPrice} / night</p>
                                <p>Description: {room.roomDescription}</p>
                            </div>

                            <div className="reserve-now-div">
                                {isClerk ? (
                                    <button className="edit-room-button"
                                            onClick={() => navigate(`/clerk/edit-room/${room.id}`)}
                                    >
                                        Edit Room
                                    </button>
                                ) : (
                                    <button
                                        className="reserve-now-button"
                                        onClick={() => navigate(`rooms/room-by-id/${room.id}`)}
                                    >
                                        Reserve Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default RoomResult;