// FreelancerDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaPlusCircle } from 'react-icons/fa';

const FreelancerDashboard = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Update Profile',
      description: 'Keep your personal info current for clients to trust you.',
      icon: <FaUserEdit size={40} className="text-green-600" />,
      to: '/freelancer/personal_information',
    },
    {
      title: 'Add & Manage Gigs',
      description: 'Create new gigs or update existing ones to grow your business.',
      icon: <FaPlusCircle size={40} className="text-green-600" />,
      to: '/freelancer/manage_gig',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto flex flex-col space-y-8">
        {options.map((opt) => (
          <div
            key={opt.title}
            onClick={() => navigate(opt.to)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                {opt.icon}
              </div>
              <h2 className="ml-4 text-xl font-semibold text-gray-800">
                {opt.title}
              </h2>
            </div>
            <p className="text-gray-600 flex-1">
              {opt.description}
            </p>
            <button
              className="mt-6 inline-flex items-center text-green-600 hover:text-green-700 font-medium self-start"
            >
              Go to {opt.title}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancerDashboard;
