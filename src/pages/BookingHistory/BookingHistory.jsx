import React from "react";
import { format, parse, parseISO } from "date-fns";

import Layout from "../../components/layout/Layout";
import { useAuthStore } from "../../store/AuthStore";
import { useEventStore } from "../../store/EventStore";

const BookingHistory = () => {
  const { currentUser } = useAuthStore();
  const { bookings, getEvent } = useEventStore();

  // Filter bookings for the current user
  const userBookings = bookings.filter(
    (booking) => booking.clientEmail === currentUser?.email
  );

  //console.log(userBookings)

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

        {userBookings.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">You haven't booked any events yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userBookings.map((booking) => {
              const event = getEvent(booking.eventId);
              if (!event) return null;

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {format(parseISO(event.date), "MMMM d, yyyy")} at{" "}
                          {format(
                            parse(event.time, "HH:mm", new Date()),
                            "h:mm a"
                          )}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {event.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {booking.numberOfAttendees}{" "}
                          {booking.numberOfAttendees === 1
                            ? "attendee"
                            : "attendees"}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Booked on{" "}
                          {format(
                            parseISO(booking.bookingDate),
                            "MMMM d, yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingHistory;
