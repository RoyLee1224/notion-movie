import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetContent = (contentType) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/list/${contentType}`);
        setContent(response.data);
      } catch (error) {
        console.error(`Failed to fetch ${contentType} content:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentType]);

  return { content, loading };
};

export default useGetContent;
