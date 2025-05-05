import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Modal from "react-modal";

import EventCard from "../../../components/EventCard";
import EventForm from "../../../components/EventForm";
//import EventFilters from "../../../components/EventFilters";
import Layout from "../../../components/layout/Layout";
import { useEventStore } from "../../../store/EventStore";

Modal.setAppElement("#root");

const AdminEventList = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventStore();
  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  // console.log(eventToEdit);

  const handleCreateEvent = (eventData) => {
    addEvent(eventData);
    setShowCreateForm(false);
  };

  const handleEditEvent = (updatedEvent) => {
    updateEvent(updatedEvent);
    setEventToEdit(null);
  };

  const handleViewBookings = (eventId) => {
    navigate(`/admin/events/${eventId}/bookings`);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "800px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      borderRadius: "0.5rem",
      padding: "0",
      border: "none",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="text-sm px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5 mr-1" />
            Create Event
          </button>
        </div>

        {/* Modal pour la création d'événement */}
        <Modal
          isOpen={showCreateForm}
          onRequestClose={() => setShowCreateForm(false)}
          style={customStyles}
          contentLabel="Create Event Modal"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Event</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <EventForm
              onSubmit={handleCreateEvent}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </Modal>

        {/* Modal pour la modification d'un événement */}
        <Modal
          isOpen={!!eventToEdit}
          onRequestClose={() => setEventToEdit(null)}
          style={customStyles}
          contentLabel="Edit Event Modal"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Event</h2>
              <button
                onClick={() => setEventToEdit(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <EventForm
              initialValues={eventToEdit}
              onSubmit={handleEditEvent}
              onCancel={() => setEventToEdit(null)}
            />
          </div>
        </Modal>

        {events.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">
              No events created yet. Click "Create Event" to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="flex flex-col h-full">
                <EventCard
                  event={event}
                  onEditClick={() => setEventToEdit(event)}
                  onDeleteClick={() => handleDeleteEvent(event.id)}
                />
                <button
                  onClick={() => handleViewBookings(event.id)}
                  className="mt-2 cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm px-4 py-2"
                >
                  View Bookings
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminEventList;
