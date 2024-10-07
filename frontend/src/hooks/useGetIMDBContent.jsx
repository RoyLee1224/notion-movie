import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetIMDBContent = () => {
  const [IMDBContent, setIMDBContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/list/imdb');
        setIMDBContent(response.data);
      } catch (error) {
        console.error('Failed to fetch IMDB content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { IMDBContent, loading };
};

export default useGetIMDBContent;
