import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SharedSessionPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const now = new Date().toISOString();

        const res = await axios.get(`${apiUrl}/items/shared_links`, {
          params: {
            filter: {
              token: { _eq: token },
              expires_at: { _gte: now },
            },
            fields: 'session_id.id,pages.id',
          },
        });

        const sharedLink = res.data.data[0];

        if (sharedLink && sharedLink.session_id?.id) {
          navigate(`/public-sessions/${sharedLink.session_id.id}/pages/1`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Kon gedeelde link niet ophalen:', err);
        setLoading(false);
      }
    };

    fetchLink();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          {loading ? 'Bezig met laden...' : 'Deze link is ongeldig of verlopen.'}
        </h2>
      </div>
    </div>
  );
}
