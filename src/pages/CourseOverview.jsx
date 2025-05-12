import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function CourseOverview({ courseId }) {
  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!courseId) return;

    const fetchData = async () => {
      try {
        // Haal sessies op
        const sessionRes = await axios.get(
          `${apiUrl}/items/sessions?filter[course][_eq]=${courseId}`
        );
        const sortedSessions = sessionRes.data.data.sort((a, b) => a.order - b.order);
        setSessions(sortedSessions);

        // Haal cursusgegevens op (zonder .id in cover_image)
        const courseRes = await axios.get(
          `${apiUrl}/items/courses/${courseId}?fields=*,cover_image.filename_disk`
        );        

        console.log('Gekozen cursusgegevens:', courseRes.data.data);
        console.log('Cover image waarde:', courseRes.data.data.cover_image);

        setCourse(courseRes.data.data);

        setLoading(false);
      } catch (err) {
        console.error('Fout bij het ophalen van data:', err);
        setError('Er is een probleem met het ophalen van de cursus of sessies.');
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, apiUrl]);

  return (
    <DashboardLayout>
      {/* Cover met afbeelding en titel (correcte stacking) */}
      <div className="relative w-full h-48 md:h-64 mb-6 overflow-hidden rounded-lg">
        {course?.cover_image ? (
          <img
            src={`${apiUrl}/assets/${course.cover_image.filename_disk}`}
            alt={course.cover_image.title || 'Cursus cover'}
            className="w-full h-full object-cover"
          />        
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}

        {/* Overlay met titel */}
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 text-center px-4 z-10">
            {course?.title || 'Cursus'}
          </h1>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-4">
          Cursusoverzicht
        </h2>

        {loading && <p className="text-gray-500">Bezig met laden...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <ul className="space-y-4">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="p-4 border-b border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Link
                to={`/sessions/${session.id}`}
                className="text-lg font-semibold text-gray-800 dark:text-gray-100"
              >
                {session.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
}
