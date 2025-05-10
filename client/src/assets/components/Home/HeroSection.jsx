import React, { useState, useContext } from "react";
import { Search, ArrowRight } from "lucide-react";
import GigList from "../shared/GigList";
import { SearchContext } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const { fetchGigs } = useContext(SearchContext); // Use context
  const navigate = useNavigate();

  const carouselData = [
    {
      id: 1,
      primaryColor: "#125867",
      primaryImage: "https://99designs-start-static.imgix.net/homepage/little-danube.jpg?auto=format&w=370&h=370&q=45&dpr=2",
      secondaryImages: [
        { url: "https://99designs-start-static.imgix.net/homepage/little-danube-packaging.png?auto=format&w=354&415&q=45&dpr=2", className: "absolute -bottom-10 -left-60 w-[330px] h-[380px] -rotate-6  z-20" },
        { url: "https://99designs-start-static.imgix.net/homepage/little-danube-logo.png?auto=format&w=216&115&q=60&dpr=2", className: "absolute -top-12 right-2 w-24 z-20" },
        { url: "https://99designs-start-static.imgix.net/homepage/little-danube-background.png?auto=format&w=216&115&q=60&dpr=2", className: "absolute -top-4 ml-[117px] rotate-12 w-90 -z-10" }
      ],
      customer: "Little Danube",
      designer: {
        name: "Kamilla Oblakova",
        profile: "/profiles/3775510",
        avatar: "https://99designs-start-static.imgix.net/homepage/profile-image-kamilla-oblakova.jpg?auto=format&w=32&h=32&q=65&dpr=2",
        position: "bottom-right",
        color: "#125867"
      }
    },
    {
      id: 2,
      primaryColor: "#834692",
      primaryImage: "https://99designs-start-static.imgix.net/homepage/vegan-jerky.jpg?auto=format&w=370&h=370&q=45&dpr=2",
      secondaryImages: [
        { url: "https://99designs-start-static.imgix.net/homepage/vegan-jerky-background.png?auto=format&w=574&h=195&q=45&dpr=2", className: "absolute -top-10 left-20 h-[195px] w-[574px] absolute" },
        { url: "https://99designs-start-static.imgix.net/homepage/vegan-jerky-front.png?auto=format&w=354&h=113&q=45&dpr=25", className: "absolute bottom-0 right-0 w-32 shadow-lg" },
        { url: "https://99designs-start-static.imgix.net/homepage/vegan-jerky-packaging.png?auto=format&w=334&h=410&q=45&dpr=2", className: "absolute top-10 -right-20 w-40 rotate-12 shadow-xl" },
        { url: "https://99designs-start-static.imgix.net/homepage/vegan-jerky-star.png?auto=format&w=22&h=25&q=45&dpr=2", className: "absolute top-32 left-48 w-8 animate-pulse" }
      ],
      customer: "Vegan Jerky Co",
      designer: {
        name: "Mj.vass",
        profile: "/profiles/1158351",
        avatar: "https://99designs-start-static.imgix.net/homepage/avatar-mjvass.jpg?auto=format&w=32&h=32&q=65&dpr=2",
        position: "top-left",
        color: "#FE5F50"
      }
    },
    {
      id: 3,
      primaryColor: "#00857D",
      primaryImage: "https://99designs-start-static.imgix.net/homepage/feel-good-tea.jpg?auto=format&w=370&h=370&q=45&dpr=2",
      secondaryImages: [
        { url: "https://99designs-start-static.imgix.net/homepage/feel-good-tea-logo.png?auto=format&w=143&h=143&q=45&dpr=2", className: "absolute top-1/2 -left-20 w-24 shadow-md" },
        { url: "https://99designs-start-static.imgix.net/homepage/feel-good-tea-cup.png?auto=format&w=277&h=390&q=45&dpr=2", className: "absolute -bottom-10 right-10 w-48" },
        { url: "https://99designs-start-static.imgix.net/homepage/feel-good-tea-business-card.png?auto=format&w=369&h=226&q=45&dpr=2", className: "absolute top-32 -right-32 w-64 rotate-12 shadow-lg" }
      ],
      customer: "Feel Good Tea Co.",
      designer: {
        name: "Raveart",
        profile: "/profiles/raveart7",
        avatar: "https://99designs-start-static.imgix.net/homepage/avatar-raveart.jpg?auto=format&w=32&h=32&q=65&dpr=2",
        position: "top-left",
        color: "#F9F57B",
        darkText: true
      }
    },
    {
      id: 4,
      primaryColor: "#1B45E3",
      primaryImage: "https://99designs-start-static.imgix.net/homepage/the-studio.jpg?auto=format&w=370&h=370&q=45&dpr=2",
      secondaryImages: [
        { url: "https://99designs-start-static.imgix.net/homepage/the-studio-shirt.png?auto=format&w=354&415&q=45&dpr=2", className: "absolute bottom-10 left-10 w-48 shadow-xl" },
        { url: "https://99designs-start-static.imgix.net/homepage/the-studio-background-art-1.png?auto=format&w=216&115&q=60&dpr=2", className: "absolute top-20 -left-20 w-32 opacity-70" },
        { url: "https://99designs-start-static.imgix.net/homepage/the-studio-background-art-2.png?auto=format&w=216&h=115&q=60&dpr=2", className: "absolute top-10 right-20 w-28 rotate-12" }
      ],
      customer: "The Studio Chicago",
      designer: {
        name: "illusive trust",
        profile: "/profiles/1821727",
        avatar: "https://99designs-start-static.imgix.net/homepage/avatar-illusive-trust.jpg?auto=format&w=32&h=32&q=65&dpr=2",
        position: "top-left",
        color: "#1B45E3"
      }
    }
  ];

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + 4) % 4 || 4);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev % 4) + 1);
  };

  const currentSlideData = carouselData.find(item => item.id === currentSlide);

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchGigs(searchInput);
      navigate(`/search-results?query=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };



  return (
    <div className="hero-section  w-full flex flex-col lg:flex-row bg-gray-50">
      {/* Left Section - Keep your existing left side code */}
      <div className="fSection w-full flex flex-col  my-auto items-left sm:px-10 py-12">
        {/* LEFT SIDE */}
      <div className="fSection w-full flex flex-col justify-center my-auto text-center items-left sm:px-10 lg:px-20 py-12">
        <h1 className="text-4xl font-bold text-black text-left mb-6 ">
          Connecting clients in need to freelancers
        </h1>

        <p className="text-lg text-left text-gray-700 mb-6">
          Contra is a network of independent creatives, connecting you with the talent and tools to get work underway.
        </p>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-xl px-4 py-3 bg-white border border-gray-300 rounded-full shadow-md mb-6">
          <Search className="w-5 h-5 ml-3 text-gray-500 cursor-pointer" onClick={handleSearch} />
          <input
            type="text"
            placeholder="Search for any service..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 text-gray-700 bg-transparent outline-none"
          />
          <button className="px-4 py-3 text-white bg-black rounded-full" onClick={handleSearch}>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-black">Popular Skills:</p>
          <button onClick={() => fetchGigs("Web Development")} className="px-3 py-1 text-sm text-black bg-white border border-gray-400 rounded-full hover:bg-gray-100">Web Dev</button>
          <button onClick={() => fetchGigs("Graphic Design")} className="px-3 py-1 text-sm text-black bg-white border border-gray-400 rounded-full hover:bg-gray-100">Graphic Design</button>
          <button onClick={() => fetchGigs("Database")} className="px-3 py-1 text-sm text-black bg-white border border-gray-400 rounded-full hover:bg-gray-100">Database</button>
        </div>
      </div>
      </div>

      {/* Right Section - Carousel */}
      <div className="sSection relative w-full flex ">
        <div className="homepage-hero-carousel w-full max-w-4xl">
          <div className={`homepage-hero-artwork  transition-colors duration-500`} 
               style={{ backgroundColor: `${currentSlideData.primaryColor}10` }}>
               
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Primary Image */}
              <figure className="design-figure relative z-10">
                <div className="design-figure__image-container">
                  <img 
                    src={currentSlideData.primaryImage} 
                    className="w-[350px] h-[350px] object-cover rounded-lg shadow-xl z-1" 
                    alt="Primary design" 
                  />
                </div>
              </figure>

              {/* Secondary Images */}
              {currentSlideData.secondaryImages.map((img, index) => (
                <img 
                  key={index}
                  src={img.url}
                  className={img.className}
                  alt={`Design element ${index + 1}`}
                />
              ))}

              {/* Customer Attribution */}
              <div className="absolute bottom-4 left-4 attribution--small">
                <span className="text-sm text-gray-600">
                  Created for {currentSlideData.customer}
                </span>
              </div>

              {/* Designer Attribution */}
              <div className={`absolute ${currentSlideData.designer.position === 'top-left' ? 'top-4 left-4' : 'bottom-4 right-4'} 
                            flex items-center gap-2 p-2 rounded-lg`}
                   style={{ backgroundColor: `${currentSlideData.designer.color}20` }}>
                <img 
                  src={currentSlideData.designer.avatar} 
                  className="w-8 h-8 rounded-full" 
                  alt="Designer avatar" 
                />
                <span className={`text-sm font-medium ${currentSlideData.designer.darkText ? 'text-gray-800' : 'text-white'}`}>
                  {currentSlideData.designer.name.split(' ')[0]} by {currentSlideData.designer.name}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
            {[1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setCurrentSlide(dot)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === dot ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;