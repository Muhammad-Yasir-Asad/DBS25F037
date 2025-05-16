// GigList.jsx
import React, { useContext } from "react";
import GigCard from "./GigCard";
import { SearchContext } from "../Context/SearchContext";
import ClientDashboard from "../pages/Client";

const GigList = () => {
  const { gigResults, isLoading, searchQuery } = useContext(SearchContext);

  if (isLoading) return <p>Loading...</p>;
  if (gigResults.length === 0)
    return <p>No gigs found for "{searchQuery}".</p>;


  return (
    <>
    
    <ClientDashboard />
    <div style={{ marginInline: '120.111px', 
    marginTop: '50px',
    }}>
      <div className="gig-list-header mb-8">
        <div className="antialiased text-[#62646a] font-sans text-base leading-6 ">
  <h2 className="text-gray-800 text-3xl ">
    Results for <span className="font-extrabold text-black">"{searchQuery}"</span>
  </h2>
</div>

        <p className="pt-3 text-gray-500">{gigResults.length} results</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        
        {gigResults.map((gig) => (
          
          <GigCard 
            key={gig.gigId} 
            item={gig} 
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default GigList;
