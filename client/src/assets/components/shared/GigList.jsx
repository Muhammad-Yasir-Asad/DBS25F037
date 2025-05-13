// GigList.jsx
import React, { useContext } from "react";
import GigCard from "./GigCard";
import { SearchContext } from "../Context/SearchContext";

const GigList = () => {
  const { gigResults, isLoading, searchQuery } = useContext(SearchContext);

  if (isLoading) return <p>Loading...</p>;
  if (gigResults.length === 0)
    return <p>No gigs found for "{searchQuery}".</p>;

  return (
    <div style={{ marginInline: '110.111px' }}>
      <div className="gig-list-header mb-5">
        <h2>Results for "{searchQuery}"</h2>
        <p>{gigResults.length} results</p>
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
  );
};

export default GigList;
