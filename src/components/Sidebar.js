import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-black text-white w-64 p-4">
      <div className="mb-4">
        <a href="/" className="block py-2 hover:text-red-500">Home</a>
      </div>
      <div className="mb-4">
        <a href="/last-watched" className="block py-2 hover:text-red-500">Last Watched</a>
      </div>
      <div className="mb-4">
        <a href="/playlist" className="block py-2 hover:text-red-500">Playlist</a>
      </div>
      <div>
        <a href="/trending" className="block py-2 hover:text-red-500">Trending</a>
      </div>
    </aside>
  );
};

export default Sidebar;
