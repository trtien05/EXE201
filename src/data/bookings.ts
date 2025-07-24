import type { Booking } from "./types";

// Array to store all bookings
export const bookings: Booking[] = [];

// Function to add a new booking
export const addBooking = (booking: Booking) => {
  bookings.push(booking);
};

// Function to get bookings by user id
export const getBookingsByUserId = (userId: string): Booking[] => {
  return bookings.filter((b) => b.userId === userId);
};
