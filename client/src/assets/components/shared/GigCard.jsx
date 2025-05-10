import React, { useState } from "react";
import { PlayCircle, Star } from "lucide-react";

const GigCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
      style={{
        border: "1px solid #e4e5e7",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "382px",
        overflow: "hidden",
      }}
    >
      {/* Video Thumbnail */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "316 / 200", borderRadius: "8px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <video
            src={item.videoUrl}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            style={{ borderRadius: "8px" }}
          />
        ) : (
          <img
            src={item.thumbnailUrl}
            alt="Gig Thumbnail"
            className="w-full h-full object-cover"
            style={{ borderRadius: "8px" }}
          />
        )}
        <PlayCircle
          className="absolute bottom-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
          size={28}
        />
      </div>

      {/* User & Info */}
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={item.userProfile || "https://i.pravatar.cc/40"}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">{item.username}</span>
        </div>

        {/* Gig Title as <a> */}
        <a
          href={item.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black text-sm leading-snug line-clamp-2 hover:underline"
        >
          {item.title}
        </a>

        {/* Rating and Reviews */}
        <div className="flex items-center text-sm text-black mt-1">
          <Star size={14} fill="black" className="mr-1" />
          <span className="font-semibold mr-1">5.0</span>
          <span className="text-gray-500">(8)</span>
        </div>

        {/* Price */}
        <div className="text-sm text-black mt-1 font-bold">
          From PKR {item.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default GigCard;
