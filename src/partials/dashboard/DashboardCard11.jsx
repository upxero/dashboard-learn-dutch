import React from 'react';
import { Link } from 'react-router-dom';
import studyImage from '../../images/study-11.jpg';
import { ClipboardIcon } from '@heroicons/react/24/outline';

function DashboardCard11() {
  const courseLink = 'https://www.learn-dutch-online.com/intermediate-flemish-plus-2/';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(courseLink)
      .then(() => {
        alert('Link gekopieerd naar clipboard!');
      })
      .catch((err) => {
        console.error('Fout bij kopiëren: ', err);
      });
  };

  return (
    <div className="flex flex-col h-full col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5 flex-grow">
        <header className="flex justify-between items-start mb-2">
        <Link to="/courses/intermediate-plus-part-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Intermediate plus Part 2</h2>
        </Link>
        {/* Copy button */}
        <button 
          onClick={copyToClipboard} 
          className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Kopieer link"
        >
          <ClipboardIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
        </button>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sessions</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">4</div>
          <div className="text-sm font-medium text-orange-700 px-1.5 bg-orange-500/20 rounded-full ml-auto">Intermediate</div>
        </div>
      </div>
      <div className="flex-grow flex items-end">
        <img
          src={studyImage} 
          alt="Studie afbeelding" 
          className="w-full h-48 object-cover rounded-b-xl"
        />
      </div>
    </div>
  );
}

export default DashboardCard11;