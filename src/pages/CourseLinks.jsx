// src/pages/CourseLinks.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';

const API_URL = import.meta.env.VITE_API_URL;

export default function CourseLinks() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/items/courses`)
      .then(res => {
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Er is iets misgegaan bij het ophalen van de cursussen.');
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Cursussen</h1>

      {loading && <p>Bezig met laden...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id}>
            <Link
              to={`/courses/${course.slug}`}
              className="text-blue-600 hover:underline"
            >
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
}
