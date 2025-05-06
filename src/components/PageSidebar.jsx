import { Link, useParams, NavLink } from 'react-router-dom';
import logo from '../images/logo.png';

export default function PageSidebar({ pages, currentOrder, title, session, baseRoute }) {
  const { sessionId } = useParams();

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-900 p-4 shadow-md rounded mb-4 md:mb-0 md:mr-6">
      {/* Logo */}
      <NavLink end to="/" className="block mb-4 text-center">
        <img src={logo} alt="Logo" className="h-14 w-auto mx-auto" />
      </NavLink>

      {/* Titel */}
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
        {title || 'Cursus'}
      </h1>

      {/* Sessie */}
      <h2 className="text-base text-gray-800 dark:text-gray-100 mb-4 text-center">
        {session || 'Sessie'}
      </h2>

      {/* Pagina links */}
      <ul className="space-y-2">
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              to={`/${baseRoute}/${sessionId}/pages/${page.order}`}
              className={`block px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
                page.order === currentOrder ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
