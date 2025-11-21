import { useState, useEffect } from 'react';
import { getMovieDetails, getTVShowDetails, getImageUrl } from '../services/tmdb';

function DetailsPage({ mediaId, mediaType, onBack }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = mediaType === 'movie'
          ? await getMovieDetails(mediaId)
          : await getTVShowDetails(mediaId);

        setDetails(data);
      } catch (err) {
        setError('Failed to load details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [mediaId, mediaType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-400">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Search
          </button>
          <div className="text-center py-12">
            <p className="text-red-500">{error || 'Details not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';
  const backdropUrl = getImageUrl(details.backdrop_path, 'original');
  const posterUrl = getImageUrl(details.poster_path, 'w500');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {backdropUrl && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={backdropUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Back to Search
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {posterUrl && (
            <div className="flex-shrink-0">
              <img
                src={posterUrl}
                alt={title}
                className="w-full md:w-80 rounded-lg shadow-xl"
              />
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <p className="text-gray-400 text-lg mb-4">{year}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-2xl">⭐</span>
                <span className="text-2xl font-bold">{rating}</span>
                <span className="text-gray-400">/ 10</span>
              </div>
            </div>

            {details.genres && details.genres.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {details.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {details.overview && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-gray-300 leading-relaxed">{details.overview}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              {details.runtime && (
                <div>
                  <span className="text-gray-400">Runtime:</span>
                  <span className="ml-2">{details.runtime} min</span>
                </div>
              )}
              {details.number_of_seasons && (
                <div>
                  <span className="text-gray-400">Seasons:</span>
                  <span className="ml-2">{details.number_of_seasons}</span>
                </div>
              )}
              {details.number_of_episodes && (
                <div>
                  <span className="text-gray-400">Episodes:</span>
                  <span className="ml-2">{details.number_of_episodes}</span>
                </div>
              )}
              {details.status && (
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="ml-2">{details.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
