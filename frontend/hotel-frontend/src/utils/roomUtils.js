export const getRoomTypeValue = (roomType) => {
    switch (roomType) {
        case 'Single': return 1;
        case 'Double': return 2;
        case 'Triple': return 3;
        case 'Suite': return 4;
        default: return 5;
    }
};

export const sortRoomsByType = (rooms) => {
    return rooms.sort((a, b) => getRoomTypeValue(a.roomType) - getRoomTypeValue(b.roomType));
};
