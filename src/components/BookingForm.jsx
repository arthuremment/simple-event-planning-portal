import React, { useState } from "react";
import { useAuthStore } from "../store/AuthStore";

const BookingForm = ({ eventId, availableCapacity, onSubmit, onCancel }) => {
  const { currentUser } = useAuthStore()
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: currentUser.email || "",
    clientPhone: "",
    numberOfAttendees: 1,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "numberOfAttendees" ? parseInt(value, 10) || 1 : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Name is required";
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = "Email is invalid";
    }

    if (formData.numberOfAttendees <= 0) {
      newErrors.numberOfAttendees = "Number of attendees must be at least 1";
    } else if (formData.numberOfAttendees > availableCapacity) {
      newErrors.numberOfAttendees = `Maximum available capacity is ${availableCapacity}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const success = onSubmit({
        eventId,
        ...formData,
      });

      if (!success) {
        setErrors({
          ...errors,
          form: "Unable to complete booking. The event may be fully booked.",
        });
      }

      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="clientName"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md outline-none px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.clientName ? "border-red-500" : ""
          }`}
          placeholder="Enter your full name"
        />
        {errors.clientName && (
          <p className="mt-1 text-sm text-red-600 italic">
            {errors.clientName}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="clientEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="clientEmail"
          name="clientEmail"
          readOnly
          value={formData.clientEmail}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md outline-none px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.clientEmail ? "border-red-500" : ""
          }`}
          placeholder="Enter your email address"
        />
        {errors.clientEmail && (
          <p className="mt-1 text-sm text-red-600 italic">
            {errors.clientEmail}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="clientPhone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number{" "}
          <span className="italic text-gray-500 font-normal">(Optional)</span>
        </label>
        <input
          type="tel"
          id="clientPhone"
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md outline-none px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label
          htmlFor="numberOfAttendees"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Attendees <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          id="numberOfAttendees"
          name="numberOfAttendees"
          value={formData.numberOfAttendees}
          onChange={handleChange}
          min="1"
          max={availableCapacity}
          className={`mt-1 block w-full rounded-md outline-none px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.numberOfAttendees ? "border-red-500" : ""
          }`}
        />
        {errors.numberOfAttendees && (
          <p className="mt-1 text-sm text-red-600">
            {errors.numberOfAttendees}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {availableCapacity} spots available
        </p>
      </div>

      {errors.form && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{errors.form}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 text-sm px-4 py-2 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 text-sm px-4 py-2 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "Processing..." : "Book Event"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
