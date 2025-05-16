import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Search,
  Menu,
  X,
  Bell,
  MessageSquare,
  User,
  LayoutDashboard,
  Briefcase,
  DollarSign,
  MessageCircle,
  UserCircle,
  Settings,
  LogOut,
  Shuffle,
} from "lucide-react";
import AuthForm from "../Home/AuthForm";
import ModeSwitch from "../shared/ModeSwitch";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";



const ClientNavbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
    const { fetchGigs } = useContext(SearchContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
     

  const dropdownRef = useRef(null);

  const toggleForm = () => {
    setFormOpen(!formOpen);
    setMenuOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setProfileDropdown(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleChat= () => {
    navigate("/chat");
   
  }

  const handleSearch = () => {
      if (searchInput.trim()) {
        fetchGigs(searchInput);
        navigate(`/search-results?query=${encodeURIComponent(searchInput)}`);
      }
    };

  

  return (
    <>
      <nav className="w-full py-4 px-4 sm:px-6 bg-white sticky top-0 z-50 shadow">
        <div className="flex justify-between items-center flex-wrap gap-3 md:gap-0">
          {/* Brand & Toggle */}
          <div className="flex items-center w-full md:w-auto justify-between md:justify-start space-x-4">
            <span className="text-xl font-bold">SkillHub</span>
            <div className="flex md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:flex md:w-auto flex-grow md:max-w-2xl">
  <div className="w-full h-[40px] border border-gray-300 rounded-md overflow-hidden flex mt-2 md:mt-0">
    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="What service are you looking for today?"
      className="w-full h-full text-sm px-3 outline-none"
    />
    
    <button className="h-full px-4 bg-black flex items-center justify-center" onClick={handleSearch}>
      <Search className="text-white h-4 w-4" />
    </button>
  </div>
</div>


          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <button className="p-2 text-gray-600 hover:text-green-600" onClick={handleChat} >
              <MessageSquare size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <a
  href=""
  className="text-[16px] text-black font-semibold py-2 px-3 rounded-md flex items-center justify-center gap-2 hover:text-green-600 transition"
>
  Orders
</a>

            <ModeSwitch >
  {(mode) => (
    <a
      href="#"
      className="text-sm font-semibold py-2 px-3 rounded-md flex items-center justify-center gap-2"
      style={{
        background: "linear-gradient(84deg, #f0a6a6 3%, #065d7f 73%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textDecoration: "none",
      }}
    >
      Switch
      <Shuffle size={16} />
      Switch to {mode === "Selling" ? "Buying" : "Selling"}
    </a>
  )}
</ModeSwitch>


            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="h-9 w-9 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center"
              >
                <User size={18} />
              </div>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded shadow-lg border z-50">
                  <div className="px-4 py-2 border-b text-gray-700 font-semibold">
                    Freelancer123
                  </div>
                  <ul className="py-2 text-sm text-gray-700 space-y-1">
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <LayoutDashboard size={16} className="mr-2" />
                      Dashboard
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Briefcase size={16} className="mr-2" />
                      My Projects
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <DollarSign size={16} className="mr-2" />
                      Earnings
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <MessageCircle size={16} className="mr-2" />
                      Messages
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <UserCircle size={16} className="mr-2" />
                      Profile
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </li>
                    <li className="px-4 pt-2">
                      <ModeSwitch>
                        {(mode) => (
                          <button
                            className="w-full text-white text-sm font-medium py-2 px-3 rounded-md flex items-center justify-center gap-2"
                            style={{
                              background: "linear-gradient(84deg, #f0a6a6 3%, #065d7f 73%)",
                            }}
                          >
                            <Shuffle size={16} />
                            Switch to {mode === "Selling" ? "Buying" : "Selling"}
                          </button>
                        )}
                      </ModeSwitch>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 bg-white shadow rounded p-4 space-y-4 transition-all duration-300">
            <ul className="space-y-3 font-medium text-gray-700">
              <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                <LayoutDashboard size={16} />
                Dashboard
              </li>
              <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                <Briefcase size={16} />
                My Projects
              </li>
              <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                <DollarSign size={16} />
                Earnings
              </li>
              <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                <MessageCircle size={16} />
                Messages
              </li>
              <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                <UserCircle size={16} />
                Profile
              </li>
              <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                <Settings size={16} />
                Settings
              </li>
              <li className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                <LogOut size={16} />
                Logout
              </li>

              <li>
                <ModeSwitch>
                  {(mode) => (
                    <button
                      className="w-full text-white text-sm font-medium py-2 px-3 rounded-md flex items-center justify-center gap-2"
                      style={{
                        background: "linear-gradient(84deg, #f0a6a6 3%, #065d7f 73%)",
                      }}
                    >
                      <Shuffle size={16} />
                      Switch to {mode === "Selling" ? "Buying" : "Selling"}
                    </button>
                  )}
                </ModeSwitch>
              </li>
            </ul>
            <div className="flex space-x-4 pt-2 border-t">
              <button className="text-gray-600 hover:text-green-600">
                <MessageSquare size={20} />
              </button>
              <button className="text-gray-600 hover:text-green-600 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              </button>
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

export default ClientNavbar;
