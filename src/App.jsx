import { useState } from 'react';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('search');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleSelectMedia = (media, mediaType) => {
    setSelectedMedia({ ...media, mediaType });
    setCurrentPage('details');
  };

  const handleBackToSearch = () => {
    setCurrentPage('search');
    setSelectedMedia(null);
  };

  return (
    <>
      {currentPage === 'search' && (
        <SearchPage onSelectMedia={handleSelectMedia} />
      )}
      {currentPage === 'details' && selectedMedia && (
        <DetailsPage
          mediaId={selectedMedia.id}
          mediaType={selectedMedia.mediaType}
          onBack={handleBackToSearch}
        />
      )}
    </>
  );
}

export default App;
