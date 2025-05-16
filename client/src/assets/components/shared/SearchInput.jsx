import { useState, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const { fetchGigs } = useContext(SearchContext);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchGigs(query);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for services..."
          className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#1DBF73] text-white px-6 py-2 hover:bg-[#19a463] transition-colors"
        >
          <FiSearch className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;