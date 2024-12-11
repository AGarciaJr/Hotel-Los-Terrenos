package com.vpalz.hotellosterrenos.enums;

/**
 * Represents the status of a reservation in the hotel system.
 * This enumeration defines the possible states a reservation can have during its lifecycle.
 */
public enum ReservationStatus {

    /**
     * Indicates that the reservation has been successfully booked
     * but the guest has not yet checked in.
     */
    BOOKED,

    /**
     * Indicates that the guest has completed their stay
     * and has officially checked out of the hotel.
     */
    CHECKED_OUT,

    /**
     * Indicates that the reservation has been canceled,
     * either by the guest or due to other reasons.
     */
    CANCELED,
    CHECKED_IN
}
