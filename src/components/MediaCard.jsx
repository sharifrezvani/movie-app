import { getImageUrl } from '../services/tmdb';

function MediaCard({ item, mediaType, onClick }) {
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const posterUrl = getImageUrl(item.poster_path, 'w500');

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] bg-gray-700">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold">⭐ {rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
        <p className="text-gray-400 text-sm">{year}</p>
      </div>
    </div>
  );
}

export default MediaCard;
