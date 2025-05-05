import React from "react";
import { format, parseISO } from "date-fns";

const BookingList = ({ bookings }) => {
  if (bookings.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-md px-4 py-5 sm:p-6">
        <p className="text-gray-500 text-center">No bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {booking.clientName}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {booking.numberOfAttendees}{" "}
                    {booking.numberOfAttendees === 1 ? "attendee" : "attendees"}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {booking.clientEmail}
                  </p>
                  {booking.clientPhone && (
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {booking.clientPhone}
                    </p>
                  )}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>Booked on {format(parseISO(booking.bookingDate), "MMMM d, yyyy")}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
