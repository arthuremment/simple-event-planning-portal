import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Login from "./pages/Login/Login";
import EventList from "./pages/EventList/EventList";
import EventDetail from "./pages/EventDetail/EventDetail";
import BookingHistory from "./pages/BookingHistory/BookingHistory";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AdminEventList from "./pages/admin/AdminEventList/AdminEventList";
import EventBookings from "./pages/admin/EventBookings/EventBookings";
import { useAuthStore } from "./store/AuthStore";

// Protected route for admin pages
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/events" />;
  }

  return <>{children}</>;
};

// Protected route for authenticated users
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/events" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <BookingHistory />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <AdminEventList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events/:id/bookings"
          element={
            <AdminRoute>
              <EventBookings />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
