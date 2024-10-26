import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import api from "./api";

function ProtectedPage() {
  const [message, setMessage] = useState('N/A');
  const [loading, setLoading] = useState(true);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    console.log('inside useeffect----------------------');
    const fecthData = async () => {
      if (!isAuth()) navigate('login');

      try {
        console.log(api.defaults.headers.common["Authorization"]);
        const response = await api.get('http://localhost:3000/protected', { signal });
        console.log(response);
        if (response.status === 200 && response.statusText === "OK") {
          console.log(response.data);
          setMessage(response.data.message);
        }
      } catch (err) {
        console.error(`caught an error: ${err}`);
        // navigate('/login');
      } finally {
        setLoading(false);
      }

    }

    fecthData();
    return () => {
      abortController.abort();
    }
  }, [setMessage, navigate, isAuth])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && <p>{message}</p>}
    </div>
  );
}

export default ProtectedPage;
