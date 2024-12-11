// WarningModal.jsx
import React from 'react';

const WarningModal = ({ isOpen, onClose, onConfirm, hasReservations }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {hasReservations ? 'Warning: Existing Reservations' : 'Confirm Deletion'}
                </h3>

                <p className="text-gray-600 mb-6">
                    {hasReservations
                        ? 'This room has existing reservations. Deleting it will also delete all associated reservations. Are you sure you want to proceed?'
                        : 'Are you sure you want to delete this room?'}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-black rounded-md hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WarningModal;