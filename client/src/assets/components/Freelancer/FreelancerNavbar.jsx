import React, { useState } from "react";
import { Menu, Search, X, Briefcase, Home, MessageSquare, Bell, User } from "lucide-react";
import AuthForm from "../Home/AuthForm";
import ModeSwitch from "../shared/ModeSwitch";
import { useNavigate } from "react-router-dom";

const FreelancerNavbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChat = () => {
    navigate("/freelancer/chat");
  };

  const toggleForm = () => {
    setFormOpen(!formOpen);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full py-4 px-4 sm:px-6 bg-white sticky top-0 z-50 shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">SkillHub</span>
          </div>

          <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
            <li className="hover:text-green-600 cursor-pointer flex items-center gap-1">
              <Home size={16} /> Home
            </li>
            <li className="hover:text-green-600 cursor-pointer flex items-center gap-1">
              <Briefcase size={16} /> Find Freelancers
            </li>
            <li className="hover:text-green-600 cursor-pointer flex items-center gap-1" onClick={handleChat}>
              <MessageSquare size={16} /> Messages
            </li>
            <li className="hover:text-green-600 cursor-pointer flex items-center gap-1">
              <ModeSwitch size={16} />
            </li>

          </ul>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-sm">Client Dashboard</span>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4">
            <ul className="space-y-4 font-medium text-gray-700">
              <li className="hover:text-green-600 cursor-pointer flex items-center gap-2">
                <Home size={16} /> Home
              </li>
              <li className="hover:text-green-600 cursor-pointer flex items-center gap-2">
                <Briefcase size={16} /> Find Freelancers
              </li>
              <li className="hover:text-green-600 cursor-pointer flex items-center gap-2">
                <MessageSquare size={16} /> Messages
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-green-600 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-sm">Client Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthForm 
        isLogin={isLogin} 
        formOpen={formOpen} 
        toggleForm={toggleForm} 
        setIsLogin={setIsLogin}
      />
    </>
  );
};

export default FreelancerNavbar;