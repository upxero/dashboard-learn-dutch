// src/pages/courses/SlugCoursePage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseOverview from '../CourseOverview';

export default function SlugCoursePage() {
  const { slug } = useParams();
  const [courseId, setCourseId] = useState(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://www.upxero.be/items/courses?filter[slug][_eq]=${slug}`);
        const course = res.data.data[0];
        if (course) {
          setCourseId(course.id);
          setCourseTitle(course.title);
        } else {
          setError('Cursus niet gevonden.');
        }
      } catch (err) {
        console.error(err);
        setError('Er is een fout opgetreden.');
      }
    };

    fetchCourse();
  }, [slug]);

  if (error) return <p>{error}</p>;
  if (!courseId) return <p>Bezig met laden...</p>;

  return <CourseOverview courseId={courseId} courseTitle={courseTitle} />;
}
