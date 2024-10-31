import React from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../../service/serviceAPI";

const RoomResult = ({roomSearchResults}) => {
    const navigate = useNavigate();
    const isAdmin = serviceAPI.isAdmin();
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
                                {isAdmin ? (
                                    <button className="edit-room-button"
                                            onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                                    >
                                        Edit Room
                                    </button>
                                ) : (
                                    <button
                                        className="reserve-now-button"
                                        onClick={() => navigate(`/room-details-reserve/${room.id}`)}
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