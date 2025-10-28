import { useEffect } from 'react';

const SITEMAP_URL = 'https://functions.poehali.dev/ef8dba09-e4a9-4cda-8f1c-29b8444eea2a';

const Sitemap = () => {
  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await fetch(SITEMAP_URL);
        const xmlText = await response.text();
        
        const blob = new Blob([xmlText], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        document.open();
        document.write(xmlText);
        document.close();
        document.contentType = 'application/xml';
      } catch (error) {
        console.error('Error fetching sitemap:', error);
      }
    };
    
    fetchSitemap();
  }, []);

  return null;
};

export default Sitemap;
