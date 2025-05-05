import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { format, parse, parseISO } from "date-fns";

import Layout from "../../../components/layout/Layout";
import BookingList from "../../../components/BookingList";
import { useEventStore } from "../../../store/EventStore";

const EventBookings = () => {
  const { getEvent, getEventBookings, getAvailableCapacity } = useEventStore();
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return (
      <Layout>
        <div className="text-center">
          <p>Event not found</p>
          <button
            onClick={() => navigate("/admin/events")}
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
          <button onClick={() => navigate("/admin/events")}  className="mt-4 inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 text-sm px-4 py-2 cursor-pointer">
            Back to Events
          </button>
        </div>
      </Layout>
    );
  }

  const bookings = getEventBookings(id);
  const availableCapacity = getAvailableCapacity(id);
  const bookedCapacity = event.capacity - availableCapacity;

  return (
    <Layout>
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/events")}
          className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 text-sm px-3 py-1.5 inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Events
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <span>{format(parseISO(event.date), "MMMM d, yyyy")}</span>
            <span>•</span>
            <span>
              {format(parse(event.time, "HH:mm", new Date()), "h:mm a")}
            </span>
            <span>•</span>
            <span>{event.location}</span>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md">
              <span className="font-medium">{event.capacity}</span> Total
              Capacity
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md">
              <span className="font-medium">{bookedCapacity}</span> Booked
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
              <span className="font-medium">{availableCapacity}</span> Available
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Bookings</h2>
        <p className="text-gray-600">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"} for this event
        </p>
      </div>

      <BookingList bookings={bookings} />
    </Layout>
  );
};

export default EventBookings;
