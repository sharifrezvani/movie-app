import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies or TV shows..."
                    className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className={`px-6 py-3 ${query ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" : "bg-gray-800 text-gray-400"} rounded-lg transition-colors font-medium`}
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
