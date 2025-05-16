import React, { useState, useContext } from "react";
import { Menu, Search, X } from "lucide-react";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
    const { fetchGigs } = useContext(SearchContext);
     const navigate = useNavigate();
        const [searchInput, setSearchInput] = useState("");

  const toggleForm = () => {
    setFormOpen(!formOpen);
    setMenuOpen(false);
  };

   const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

    const handleSearch = () => {
      if (searchInput.trim()) {
        fetchGigs(searchInput);
        navigate(`/search-results?query=${encodeURIComponent(searchInput)}`);
      }
    };


  return (
    <>
      <nav className="w-full py-4 px-4 sm:px-6 bg-white sticky top-0 z-50 shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">SkillHub</span>
          </div>

          <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
            <li className="hover:text-green-600 cursor-pointer">Home</li>
            <li className="hover:text-green-600 cursor-pointer">Find Talent</li>
            <li className="hover:text-green-600 cursor-pointer">Works</li>
            <li className="hover:text-green-600 cursor-pointer">About Us</li>
            <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
          </ul>

          <div className="hidden md:flex items-center flex-1 max-w-[270px] mx-4">
            <div className="w-full h-[40px] border border-gray-300 rounded-md overflow-hidden flex">
              <input
                type="text"
                value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={handleKeyPress}
                placeholder="Search..."
                className="w-full h-full text-sm px-3 outline-none"
              />
              <div className="h-[60%] w-px bg-gray-300 my-auto" />
              <button className="h-full px-3 py-1 flex items-center justify-center" onClick={handleSearch}> 
                <Search className="text-gray-500 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="hidden md:flex space-x-4">
            <button
              className="text-sm px-4 py-1 border border-green-600 text-green-600 rounded-full hover:bg-green-50"
              onClick={() => {
                setIsLogin(true);
                setFormOpen(true);
              }}
            >
              Login
            </button>
            <button
              className="text-sm px-4 py-1 bg-green-600 text-white rounded-full hover:bg-green-700"
              onClick={() => {
                setIsLogin(false);
                setFormOpen(true);
              }}
            >
              Join
            </button>
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
              <li className="hover:text-green-600 cursor-pointer">Home</li>
              <li className="hover:text-green-600 cursor-pointer">Find Talent</li>
              <li className="hover:text-green-600 cursor-pointer">Works</li>
              <li className="hover:text-green-600 cursor-pointer">About Us</li>
              <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="w-full h-[40px] border border-gray-300 rounded-md overflow-hidden flex mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-full text-sm px-3 outline-none"
                />
                <div className="h-[60%] w-px bg-gray-300 my-auto" />
                <button className="h-full px-3 py-1 flex items-center justify-center">
                  <Search className="text-gray-500 h-4 w-4" />
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  className="text-sm px-4 py-1 border border-green-600 text-green-600 rounded-full hover:bg-green-50 flex-1"
                  onClick={() => {
                    setIsLogin(true);
                    setFormOpen(true);
                  }}
                >
                  Login
                </button>
                <button
                  className="text-sm px-4 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 flex-1"
                  onClick={() => {
                    setIsLogin(false);
                    setFormOpen(true);
                  }}
                >
                  Join
                </button>
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

export default Navbar;