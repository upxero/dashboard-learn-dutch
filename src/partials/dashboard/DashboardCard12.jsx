import React from 'react';
import { Link } from 'react-router-dom';
import studyImage from '../../images/study-12.jpg';

function DashboardCard12() {
  return (
    <div className="flex flex-col h-full col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5 flex-grow">
        <header className="flex justify-between items-start mb-2">
        <Link to="/courses/inburgering-a2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Inburgering A2</h2>
        </Link>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sessions</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">10</div>
          <div className="text-sm font-medium text-red-700 px-1.5 bg-red-500/20 rounded-full ml-auto">Advanced</div>
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

export default DashboardCard12;
