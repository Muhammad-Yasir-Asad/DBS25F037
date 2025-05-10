import React from 'react';
import "../css/StartSelling.css"

const SearchResult = ({ query, results }) => {
  return (
    <div className="search-results-container">
      <div className="results-header">
        <h1>Results for "{query}"</h1>
        <span className="results-count">{results.length} results</span>
      </div>
      
      <div className="gigs-grid">
        {results.map(gig => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
