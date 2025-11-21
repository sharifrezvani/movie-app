import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MediaCard from '../components/MediaCard';
import { searchMovies, searchTVShows } from '../services/tmdb';

function SearchPage({ onSelectMedia }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState('movie');

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const data = mediaType === 'movie'
        ? await searchMovies(query)
        : await searchTVShows(query);

      setResults(data.results || []);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaTypeChange = (type) => {
    setMediaType(type);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Movie & TV Show Search
        </h1>

        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleMediaTypeChange('movie')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              mediaType === 'movie'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => handleMediaTypeChange('tv')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              mediaType === 'tv'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            TV Shows
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-400">Loading...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              Search for your favorite movies or TV shows
            </p>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                mediaType={mediaType}
                onClick={() => onSelectMedia(item, mediaType)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
