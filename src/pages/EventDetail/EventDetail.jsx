import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, ChevronLeft } from "lucide-react";
import { format, parse, parseISO } from "date-fns";

import { isEventInPast } from "../../utils/helpers";
import Layout from "../../components/layout/Layout";
import BookingForm from "../../components/BookingForm";
import { useAuthStore } from "../../store/AuthStore";
import { useEventStore } from "../../store/EventStore";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { bookEvent, getAvailableCapacity, getEvent } =
    useEventStore();
  const { isAuthenticated } = useAuthStore();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!id) {
    return (
      <Layout>
        <div className="text-center">
          <p>Event not found</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-4 inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 text-sm px-4 py-2 cursor-pointer"
          >
            Back to Events
          </button>
        </div>
      </Layout>
    );
  }

  const event = getEvent(id);

  if (!event) {
    return (
      <Layout>
        <div className="text-center">
          <p>Event not found</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-4 inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 text-sm px-4 py-2 cursor-pointer"
          >
            Back to Events
          </button>
        </div>
      </Layout>
    );
  }

  const availableCapacity = getAvailableCapacity(id);
  const isPastEvent = isEventInPast(event.date, event.time);

  const handleBookEvent = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setShowBookingForm(true);
  };

  const handleBookingSubmit = (bookingData) => {
    const success = bookEvent(bookingData);

    if (success) {
      setShowBookingForm(false);
      setBookingSuccess(true);
    }

    return success;
  };

  return (
    <Layout>
      <div className="mb-4">
        <button
          onClick={() => navigate("/events")}
          className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 text-sm px-3 py-1.5 inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Events
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {event.imageUrl && (
          <div className="w-full h-64 sm:h-96">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div>
              {event.category && (
                <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full mb-2">
                  {event.category}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900">
                {event.title}
              </h1>
            </div>

            {!isPastEvent && (
              <div className="mt-4 sm:mt-0">
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    availableCapacity > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {availableCapacity > 0
                    ? `${availableCapacity} spots available`
                    : "Fully booked"}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">{event.description}</p>
              </div>

              {bookingSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="text-lg font-medium text-green-800">
                    Booking Confirmed!
                  </h3>
                  <p className="text-green-700">
                    Your booking for this event has been confirmed. Thank you!
                  </p>
                </div>
              )}

              {showBookingForm ? (
                <div className="mt-6 border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Book Your Spot</h2>
                  <BookingForm
                    eventId={id}
                    availableCapacity={availableCapacity}
                    onSubmit={handleBookingSubmit}
                    onCancel={() => setShowBookingForm(false)}
                  />
                </div>
              ) : (
                !isPastEvent &&
                !bookingSuccess && (
                  <div className="mt-6">
                    <button
                      variant="primary"
                      onClick={handleBookEvent}
                      disabled={availableCapacity === 0}
                      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 text-sm px-4 py-2 ${availableCapacity === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {availableCapacity === 0 ? "Sold Out" : "Book Now"}
                    </button>
                  </div>
                )
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Date</h4>
                    <p className="text-gray-900">{format(parseISO(event.date), "MMMM d, yyyy")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Time</h4>
                    <p className="text-gray-900">{format(parse(event.time, "HH:mm", new Date()), "h:mm a")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Location
                    </h4>
                    <p className="text-gray-900">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Capacity
                    </h4>
                    <p className="text-gray-900">
                      {isPastEvent
                        ? "Event has ended"
                        : `${availableCapacity} out of ${event.capacity} spots available`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
