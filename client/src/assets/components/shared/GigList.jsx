import React ,{ useContext} from "react";
import GigCard from "./GigCard";
import { SearchContext } from "../Context/SearchContext";
import { dummyGigData } from "../dummyGigData.js";

const GigList = () => {

    // const { gigResults, isLoading, searchQuery } = useContext(SearchContext);

    const isLoading = false;
  const searchQuery = "Web Design";
  const gigResults = dummyGigData;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle no results state
  if (gigResults.length === 0) {
    return (
      <div className="no-results">
        <p>No gigs found for "{searchQuery}". Please try a different search term.</p>
      </div>
    );
  }


  return (

    <div style={{ marginInline: '110.111px' }}>
      <div className="gig-list-header" style={{ marginBottom: '20px' }}>
        <h2>Results for "{searchQuery}"</h2>
        <p>{gigResults.length} results</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {gigResults.map((gig) => (
          <GigCard key={gig._id} item={gig} />
        ))}
      </div>
    </div>
  );
};

export default GigList;
