export const getRoomTypeValue = (roomType) => {
    switch (roomType) {
        case 'Single': return 1;
        case 'Double': return 2;
        case 'Family': return 3;
        case 'Standard': return 4;
        case 'Suite': return 5;
        case 'Deluxe': return 6;

        default: return 7;
    }
};

export const sortRoomsByType = (rooms) => {
    return rooms.sort((a, b) => getRoomTypeValue(a.roomType) - getRoomTypeValue(b.roomType));
};
