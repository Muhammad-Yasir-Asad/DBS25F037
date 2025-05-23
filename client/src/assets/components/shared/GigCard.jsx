// GigCard.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Star } from "lucide-react";

const BASE_URL = "https://skillhub.runasp.net/";  // adjust if needed

const GigCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);
console.log("User Image Path:", item);

  const navigate = useNavigate();
const videoPath = item.video.replace(/\\/g, "/");
  const imagePath = item.picture.replace(/\\/g, "/");
  const videoUrl = `${BASE_URL}${videoPath.startsWith("/") ? videoPath.slice(1) : videoPath}`;
  const imageUrl = `${BASE_URL}${imagePath.startsWith("/") ? imagePath.slice(1) : imagePath}`;
  const userImagePath = item.freelancer.user.profilePicture.replace(/\\/g, "/") || "";
const userImageUrl = userImagePath 
  ? `${BASE_URL}${userImagePath.startsWith("/") ? userImagePath.slice(1) : userImagePath}`
   : "https://i.pravatar.cc/40";


  const handleMouseEnter = () => {
  setIsHovered(true);
  const vid = videoRef.current;
  if (vid && vid.canPlayType("video/mp4")) {
    vid.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }
};

const handleMouseLeave = () => {
  setIsHovered(false);
  const vid = videoRef.current;
  if (vid) {
    vid.pause();
    vid.currentTime = 0;
    setIsPlaying(false);
  }
};

const handleTouchStart = () => {
    if (!isHovered) {
      setIsHovered(true);
      setIsPlaying(true);
      videoRef.current.play();
    } else {
      setIsHovered(false);
      setIsPlaying(false);
      videoRef.current.pause();
    }
  };

  // decide which package to show price from
  const price =
    item.basicPackage.price ??
    item.standardPackage.price ??
    item.premiumPackage.price ??
    0;

  return (
    <div
      onClick={() => navigate(`/gig/${item.gigId}`, { state: item })}
      className="bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      style={{
        border: "1px solid #e4e5e7",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "382px",
        overflow: "hidden",
      }}
    >
      {/* Video / Image */}
      <div
  className="relative w-full overflow-hidden"
  style={{ aspectRatio: "316 / 200" }}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  onTouchStart={handleTouchStart}
>
  <img
    src={imageUrl}
    alt={item.title}
    className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-200 rounded-lg ${
      isHovered ? "opacity-0" : "opacity-100"
    }`}
  />
  <video
    ref={videoRef}
    muted
    loop
    playsInline
    preload="metadata"
    className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-200 ${
      isHovered ? "opacity-100" : "opacity-0"
    }`}
  >
    <source src={videoUrl.replace(".mp4", ".webm")} type="video/webm" />
    <source src={videoUrl} type="video/mp4" />
    Your browser does not support HTML5 video.
  </video>

  <div className="absolute bottom-2 left-2 z-10">
  {isHovered && isPlaying ? (
    <Pause
      size={28}
      className="text-white bg-black bg-opacity-20 rounded-full p-1"
    />
  ) : (
    <Play
      size={28}
      className="text-white bg-black bg-opacity-20 rounded-full p-1"
    />
  )}
</div>
</div>



      {/* Content */}
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-2">
          <img
  src={userImageUrl || "https://i.pravatar.cc/40"}
  alt={item?.freelancer?.user?.username || "User"}
  className="w-7 h-7 rounded-full object-cover"
/>
          <span className="text-sm font-medium text-gray-700">
  {item?.freelancer?.user?.username || "Unknown"}
</span>
        </div>

        <a
          href="#!"
          className="text-black text-sm leading-snug line-clamp-2 hover:underline"
        >
          {item.title}
        </a>

        <div className="flex items-center text-sm text-black mt-1">
          <Star size={14} fill="black" className="mr-1" />
          <span className="font-semibold mr-1">{item.avgRating}</span>
          <span className="text-gray-500">({item.freelancer.totalCompletedOrders})</span>
        </div>

        <div className="text-sm text-black mt-1 font-semibold">
          {price > 0
            ? `Start From PKR ${price.toLocaleString()}`
            : "Contact for price"}
        </div>
      </div>
    </div>
  );
};

export default GigCard;
