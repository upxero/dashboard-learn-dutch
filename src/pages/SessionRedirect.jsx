import { useParams, Navigate } from 'react-router-dom';

export default function SessionRedirect() {
  const { sessionId } = useParams();
  return <Navigate to={`/sessions/${sessionId}/pages/1`} replace />;
}
