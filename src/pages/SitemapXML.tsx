import { useEffect, useState } from 'react';

const SITEMAP_URL = 'https://functions.poehali.dev/ef8dba09-e4a9-4cda-8f1c-29b8444eea2a';

const SitemapXML = () => {
  const [xml, setXml] = useState<string>('');

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await fetch(SITEMAP_URL);
        const xmlText = await response.text();
        setXml(xmlText);
      } catch (error) {
        console.error('Error fetching sitemap:', error);
      }
    };
    
    fetchSitemap();
  }, []);

  return (
    <div style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '12px' }}>
      {xml}
    </div>
  );
};

export default SitemapXML;
