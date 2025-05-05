import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format, parse, parseISO } from "date-fns";

import { isEventInPast } from "../utils/helpers";
import { useAuthStore } from "../store/AuthStore";
import { useEventStore } from "../store/EventStore";
import defaultImage from '../assets/default_img.webp'

const EventCard = ({ event, onEditClick, onDeleteClick }) => {
  const { isAdmin } = useAuthStore();
  const { getAvailableCapacity } = useEventStore();
  const navigate = useNavigate();

  const isPastEvent = isEventInPast(event.date, event.time);
  const availableCapacity = getAvailableCapacity(event.id);

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer`}
    >
      <div className={`w-full`}>
        <img
          src={event.imageUrl || defaultImage}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className={`p-4 flex-grow`}>
        {event.category && (
          <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full mb-2">
            {event.category}
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(parseISO(event.date), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              {format(parse(event.time, "HH:mm", new Date()), "h:mm a")}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>
              {isPastEvent
                ? "Event has ended"
                : availableCapacity > 0
                ? `${availableCapacity} spots available`
                :  <span>Fully booked</span> }
            </span>
          </div>
        </div>
      </div>

      <div className={`px-4 py-3 bg-gray-50 border-t border-gray-100 mt-auto`}>
        {isAdmin ? (
          <div className="flex space-x-2 w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick && onEditClick();
              }}
              className="text-sm px-3 py-1.5 cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick && onDeleteClick();
              }}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer text-sm px-3 py-1.5 flex-1 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm px-4 py-2 ${
              isPastEvent
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 opacity-50 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 cursor-pointer"
            }`}
            onClick={handleCardClick}
          >
            {isPastEvent ? "Event Ended" : "View Details"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
