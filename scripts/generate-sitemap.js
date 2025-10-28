import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_URL = 'https://functions.poehali.dev/ef8dba09-e4a9-4cda-8f1c-29b8444eea2a';

async function generateSitemap() {
  try {
    console.log('Fetching dynamic sitemap...');
    const response = await fetch(SITEMAP_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status}`);
    }
    
    const xmlContent = await response.text();
    
    const publicDir = path.join(__dirname, '..', 'public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    
    fs.writeFileSync(sitemapPath, xmlContent, 'utf-8');
    
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
    console.log(`📊 Size: ${(xmlContent.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

generateSitemap();
