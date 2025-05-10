
    import React, { createContext, useState } from 'react';

    export const SearchContext = createContext();

    export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [gigResults, setGigResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchGigs = async (query) => {
        setIsLoading(true);
        try {
        const response = await fetch(`https://skillhub.runasp.net/api/Gigs/search/${query}`);
        const data = await response.json();
        setGigResults(data);
        setSearchQuery(query);
        } catch (err) {
        console.error('Failed to fetch gigs:', err);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <SearchContext.Provider value={{ searchQuery, gigResults, isLoading, fetchGigs }}>
        {children}
        </SearchContext.Provider>
    );
    };
