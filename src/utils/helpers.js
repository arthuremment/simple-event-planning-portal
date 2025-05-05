// Check if an event is in the past
export const isEventInPast = (date, time) => {
  const eventDate = new Date(`${date}T${time}`);
  return eventDate < new Date();
};

// Filter events to only include upcoming events
export const filterUpcomingEvents = (events) => {
  const now = new Date();
  return events.filter(event => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    return eventDate >= now;
  });
};
