import React from 'react';

const ListeningCard = () => {
  const currentListening = {
    title: "Song Title",
    artist: "Artist Name",
    album: "Album Name"// Placeholder image
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <div>
        <h3 className="text-lg font-semibold"></h3>
        <p className="text-gray-600">{currentListening.artist}</p>
        <p className="text-gray-500 text-sm">{currentListening.album}</p>
      </div>
    </div>
  );
};

export default ListeningCard;