import React, { useState, useEffect } from "react";

import EventCard from "../../components/EventCard";
import EventFilters from "../../components/EventFilters";
import Layout from "../../components/layout/Layout";
import { categories } from "../../data";
import { filterUpcomingEvents } from "../../utils/helpers";
import { useEventStore } from "../../store/EventStore";

const EventList = () => {
  const { events } = useEventStore();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    search: '',
    category: '',
    sortBy: 'date-asc',
  });

  useEffect(() => {
      let result = filterUpcomingEvents(events);
  
      // Apply search filter
      if (filterOptions.search) {
        const searchLower = filterOptions.search.toLowerCase();
        result = result.filter(
          (event) =>
            event.title.toLowerCase().includes(searchLower) ||
            event.description.toLowerCase().includes(searchLower) ||
            event.location.toLowerCase().includes(searchLower)
        );
      }
  
      // Apply category filter
      if (filterOptions.category) {
        result = result.filter((event) => event.category === filterOptions.category);
      }
  
      // Apply sorting
      switch (filterOptions.sortBy) {
        case 'date-asc':
          result.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA.getTime() - dateB.getTime();
          });
          break;
        case 'date-desc':
          result.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateB.getTime() - dateA.getTime();
          });
          break;
        case 'title-asc':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }
  
      setFilteredEvents(result);
    }, [events, filterOptions]);
  
    const handleFilterChange = (filters) => {
      setFilterOptions(filters);
    };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
        </div>

        <EventFilters categories={categories} onFilterChange={handleFilterChange} />

        {filteredEvents.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">
              No events found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventList;
