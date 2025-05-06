import React, { useState, lazy, Suspense } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
const DashboardCard01 = lazy(() => import('../partials/dashboard/DashboardCard01'));
const DashboardCard02 = lazy(() => import('../partials/dashboard/DashboardCard02'));
const DashboardCard03 = lazy(() => import('../partials/dashboard/DashboardCard03'));
const DashboardCard04 = lazy(() => import('../partials/dashboard/DashboardCard04'));
const DashboardCard05 = lazy(() => import('../partials/dashboard/DashboardCard05'));
const DashboardCard06 = lazy(() => import('../partials/dashboard/DashboardCard06'));
const DashboardCard07 = lazy(() => import('../partials/dashboard/DashboardCard07'));
const DashboardCard08 = lazy(() => import('../partials/dashboard/DashboardCard08'));
const DashboardCard09 = lazy(() => import('../partials/dashboard/DashboardCard09'));
const DashboardCard10 = lazy(() => import('../partials/dashboard/DashboardCard10'));
const DashboardCard11 = lazy(() => import('../partials/dashboard/DashboardCard11'));
const DashboardCard12 = lazy(() => import('../partials/dashboard/DashboardCard12'));
const DashboardCard13 = lazy(() => import('../partials/dashboard/DashboardCard13'));
const DashboardCard14 = lazy(() => import('../partials/dashboard/DashboardCard14'));
const DashboardCard15 = lazy(() => import('../partials/dashboard/DashboardCard15'));
const DashboardCard16 = lazy(() => import('../partials/dashboard/DashboardCard16'));
import Banner from '../partials/Banner';
import ProtectedRoute from '../components/ProtectedRoute';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const filteredCards = [
    { component: <DashboardCard01 />, tags: ['Dutch'] },
    { component: <DashboardCard02 />, tags: ['Dutch'] },
    { component: <DashboardCard03 />, tags: ['Dutch'] },
    { component: <DashboardCard04 />, tags: ['Dutch'] },
    { component: <DashboardCard05 />, tags: ['Dutch'] },
    { component: <DashboardCard06 />, tags: ['Dutch'] },
    { component: <DashboardCard07 />, tags: ['Flemish'] },
    { component: <DashboardCard08 />, tags: ['Flemish'] },
    { component: <DashboardCard09 />, tags: ['Flemish'] },
    { component: <DashboardCard10 />, tags: ['Flemish'] },
    { component: <DashboardCard11 />, tags: ['Flemish'] },
    { component: <DashboardCard12 />, tags: ['Exampreps'] },
    { component: <DashboardCard13 />, tags: ['Exampreps'] },
    { component: <DashboardCard14 />, tags: ['Exampreps'] },
    { component: <DashboardCard15 />, tags: ['Exampreps'] },
    { component: <DashboardCard16 />, tags: ['Exampreps'] },
  ];

  const filteredDashboardCards = activeFilters.length
    ? filteredCards.filter(card =>
        card.tags.some(tag => activeFilters.includes(tag))
      )
    : filteredCards;

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
                </div>
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <FilterButton align="right" setActiveFilters={setActiveFilters} />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {filteredDashboardCards.map((card, index) => (
                  <div key={index} className="col-span-12 md:col-span-6 xl:col-span-4">
                    <Suspense fallback={<div className="text-center text-gray-500 p-4">Loading…</div>}>
                      {card.component}
                    </Suspense>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <Banner />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;
