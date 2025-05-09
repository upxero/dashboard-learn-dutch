import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CourseOverview() {
  const [courses, setCourses] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/items/courses`);
        setCourses(response.data.data);
      } catch (err) {
        console.error('Fout bij ophalen van cursussen:', err);
      }
    };

    fetchCourses();
  }, [apiUrl]);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
        Cursusoverzicht
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            to={`/sessions/${course.id}`}
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
          >
            {course.cover_image && (
              <img
                src={`${apiUrl}/assets/${course.cover_image}`}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {course.title}
              </h2>
              {course.description && (
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                  {course.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
