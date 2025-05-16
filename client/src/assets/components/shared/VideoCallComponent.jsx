import React from 'react';

const VideoCallComponent = ({ onClose }) => {
  return (
    <div className="fixed bottom-20 right-4 w-[400px] h-[300px] bg-white rounded-xl shadow-lg z-50 border border-gray-300 flex flex-col">
      <div className="flex justify-between items-center p-3 border-b bg-gray-100 rounded-t-xl">
        <h2 className="text-sm font-medium text-gray-700">Video Call</h2>
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-800 text-lg font-bold"
        >
          ×
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
        <p className="text-gray-700 mb-4">🔴 Video Call in Progress</p>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCallComponent;
  