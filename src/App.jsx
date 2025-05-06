import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';

import Dashboard from './pages/Dashboard';
import CourseOverview from './pages/CourseOverview';
import CourseLinks from './pages/CourseLinks';
import SlugCoursePage from './pages/courses/SlugCoursePage';
import SessionPage from './pages/SessionPage';
import SessionRedirect from './pages/SessionRedirect';
import SharedSessionPage from './pages/SharedSessionPage';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Wrapper zodat SessionPage herlaadt bij elke routewijziging
function SessionPageWrapper({ baseRoute }) {
  const location = useLocation();
  return <SessionPage key={location.pathname} baseRoute={baseRoute} />;
}

function App() {
  const location = useLocation();
  const baseRoute = location.pathname.includes('shared') ? 'shared-sessions' : 'sessions';

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/course-overview"
        element={
          <ProtectedRoute>
            <CourseLinks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:slug"
        element={
          <ProtectedRoute>
            <SlugCoursePage />
          </ProtectedRoute>
        }
      />

      <Route
        path={`/${baseRoute}/:sessionId/pages/:pageOrder`}
        element={
          <ProtectedRoute>
            <SessionPageWrapper baseRoute={baseRoute} />
          </ProtectedRoute>
        }
      />

      <Route
        path={`/${baseRoute}/:sessionId`}
        element={
          <ProtectedRoute>
            <SessionRedirect />
          </ProtectedRoute>
        }
      />

      {/* Gedeelde sessielink zonder login */}
      <Route path="/shared/:token" element={<SharedSessionPage />} />

      {/* Publieke toegang tot sessiepagina zonder login */}
      <Route
        path="/public-sessions/:sessionId/pages/:pageOrder"
        element={<SessionPageWrapper baseRoute="public-sessions" />}
      />
      <Route
        path="/public-shared-sessions/:sessionId/pages/:pageOrder"
        element={<SessionPageWrapper baseRoute="public-shared-sessions" />}
      />
    </Routes>
  );
}

export default App;
