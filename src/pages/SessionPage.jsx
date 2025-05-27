import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PageSidebar from '../components/PageSidebar';

export default function SessionPage({ baseRoute = 'sessions' }) {
  const { sessionId, pageOrder } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [sections, setSections] = useState([]);

  const order = parseInt(pageOrder, 10);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId || !pageOrder) return;

      console.log('⏳ Ophalen sessie en pagina’s voor:', { sessionId, pageOrder });

      try {
        // Sessie ophalen
        const sessionRes = await axios.get(`${apiUrl}/items/sessions/${sessionId}`, {
          params: {
            fields: '*,course.id,course.title'
          }
        });
        const sessionData = sessionRes.data.data;
        console.log('✅ Sessie opgehaald:', sessionData);
        setSession(sessionData);

        // Pagina's ophalen
        const pagesRes = await axios.get(`${apiUrl}/items/pages`, {
          params: {
            filter: {
              sessions: { _eq: sessionId },
            },
            fields: '*,page_section,cover_image,sessions',
          },
        });

        console.log('📄 Ongefilterde pagina-data:', pagesRes.data.data);

        const sortedPages = pagesRes.data.data.sort((a, b) => a.order - b.order);
        console.log('📄 Gesorteerde pagina’s:', sortedPages);
        setPages(sortedPages);

        const page = sortedPages.find(p => parseInt(p.order, 10) === order);
        console.log('📄 Geselecteerde pagina:', page);
        setCurrentPage(page || null);

        if (page?.page_section?.length > 0) {
          const sectionsRes = await axios.get(`${apiUrl}/items/sections`, {
            params: {
              filter: {
                id: { _in: page.page_section },
              },
            },
          });
          console.log('📦 Secties opgehaald:', sectionsRes.data.data);
          setSections(sectionsRes.data.data);
        } else {
          console.log('ℹ️ Geen secties voor deze pagina');
          setSections([]);
        }
      } catch (err) {
        console.error('❌ Fout bij ophalen data:', err);
      }
    };

    fetchData();
  }, [sessionId, pageOrder, apiUrl]);

  const handlePrevious = () => {
    if (order > 1) {
      navigate(`/${baseRoute}/${sessionId}/pages/${order - 1}`);
    }
  };

  const handleNext = () => {
    if (order < pages.length) {
      navigate(`/${baseRoute}/${sessionId}/pages/${order + 1}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <PageSidebar
        pages={pages}
        currentOrder={order}
        title={session?.course?.title || 'Cursus'}
        session={session?.title || 'Sessie'}
        baseRoute={baseRoute}
      />

      <div className="flex-1 md:ml-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {session?.course?.title && (
          <h1 className="text-3xl md:text-4xl text-gray-800 dark:text-gray-100 font-bold mb-6">
            {session.course.title}
          </h1>
        )}

        {currentPage?.cover_image && (
          <img
            src={`${apiUrl}/assets/${currentPage.cover_image}`}
            alt="Cover afbeelding"
            className="w-full max-h-85 object-cover mb-6 shadow-md"
          />
        )}

        {session?.title && (
          <h3 className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-semibold mt-4 mb-6">
            {session.title}
          </h3>
        )}

        {currentPage ? (
          <>
            <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-semibold mb-4">
              {currentPage.title}
            </h2>

            {currentPage.content && (
              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: currentPage.content }}
              />
            )}
            {currentPage.content_2 && (
              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: currentPage.content_2 }}
              />
            )}

            {!currentPage.content && !currentPage.content_2 && (
              <p className="text-gray-600 dark:text-gray-300">
                Er is geen inhoud voor deze pagina beschikbaar.
              </p>
            )}

            {sections.length > 0 && (
              <div className="mt-8">
                <ul className="space-y-6">
                  {sections.map((section) => {
                    const youTubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
                    const youTubeMatch = section.video_url?.match(youTubeRegex);
                    const youTubeEmbed = youTubeMatch ? `https://www.youtube.com/embed/${youTubeMatch[1]}` : null;

                    const hasAnyMedia =
                      !!youTubeEmbed || section.video_file || section.audio || section.image || section.content;

                    return (
                      <li key={section.id} className="p-5 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                          {section.title}
                        </h4>

                        {youTubeEmbed && (
                          <div className="relative pt-[56.25%] mb-4">
                            <iframe
                              src={youTubeEmbed}
                              title="YouTube Video"
                              className="absolute top-0 left-0 w-full h-full rounded-lg"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}

                        {section.video_file && (
                          <video controls className="w-full mb-4 rounded-lg shadow-sm">
                            <source src={`${apiUrl}/assets/${section.video_file}`} type="video/mp4" />
                            Je browser ondersteunt deze video niet.
                          </video>
                        )}

                        {section.image && (
                          <img
                            src={`${apiUrl}/assets/${section.image}`}
                            alt={section.title || 'Afbeelding'}
                            className="w-full mb-4 rounded-lg shadow-sm"
                          />
                        )}

                        {section.audio && (
                          <audio controls className="w-full mb-4 rounded-lg shadow-sm">
                            <source src={`${apiUrl}/assets/${section.audio}`} type="audio/mpeg" />
                            Je browser ondersteunt deze audio niet.
                          </audio>
                        )}

                        {section.explanation && (
                          <div className="mb-4 text-gray-600 dark:text-gray-300 italic">
                            {section.explanation}
                          </div>
                        )}

                        {section.text ? (
                          <div
                            className="text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: section.text }}
                          />
                        ) : !hasAnyMedia ? (
                          <p className="text-gray-500 italic">Geen inhoud beschikbaar</p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={order <= 1}
                className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg disabled:opacity-50 transition duration-300"
              >
                Vorige
              </button>

              <button
                onClick={handleNext}
                disabled={order >= pages.length}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg disabled:opacity-50 transition duration-300"
              >
                Volgende
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-600">Deze pagina bestaat niet in deze sessie.</p>
        )}
      </div>
    </div>
  );
}
