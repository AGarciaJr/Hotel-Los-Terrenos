export const getRoomTypeValue = (roomType) => {
    switch (roomType) {
        case 'Single': return 1;
        case 'Double': return 2;
        case 'Suite': return 3;
        default: return 4;
    }
};

export const sortRoomsByType = (rooms) => {
    return rooms.sort((a, b) => getRoomTypeValue(a.roomType) - getRoomTypeValue(b.roomType));
};
