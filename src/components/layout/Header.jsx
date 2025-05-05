import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, LogOut, User, BookOpen, CalendarDays, CalendarCog } from "lucide-react";

import { useAuthStore } from "../../store/AuthStore";

const Header = () => {
  const { currentUser, logout, isAuthenticated, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  //console.log(currentUser, isAuthenticated, isAdmin)

  return (
    <header className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white">
              <Calendar className="h-8 w-8 mr-2" />
              <span className="text-xl font-semibold">Event Planner</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/events"
                  className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <CalendarDays className="h-4 w-4 mr-1" />
                  Events
                </Link>

                {!isAdmin && (
                  <Link 
                    to="/my-bookings" 
                    className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    My Bookings
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    to="/admin/events"
                    className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <CalendarCog className="h-4 w-4 mr-1" />
                    Manage Events
                  </Link>
                )}

                <div className="flex items-center">
                  <div className="flex items-center pr-2">
                    <User className="h-5 w-5 text-indigo-100" />
                    <span className="ml-1 capitalize text-sm font-medium text-indigo-100">
                      {currentUser?.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-1 rounded-md px-3 py-2 ml-3 cursor-pointer text-white  ${isAuthenticated ? 'bg-red-700 hover:bg-red-800' : "hover:bg-indigo-700"}`}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/events"
                  className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Events
                </Link>
                <Link
                  to="/login"
                  className="text-indigo-100 border border-white hover:bg-indigo-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
