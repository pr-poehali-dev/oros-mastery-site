import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

const SITEMAP_URL = 'https://functions.poehali.dev/ef8dba09-e4a9-4cda-8f1c-29b8444eea2a';

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    async buildStart() {
      try {
        console.log('🔄 Fetching dynamic sitemap...');
        const response = await fetch(SITEMAP_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch sitemap: ${response.status}`);
        }
        
        const xmlContent = await response.text();
        const publicDir = path.join(process.cwd(), 'public');
        const sitemapPath = path.join(publicDir, 'sitemap.xml');
        
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }
        
        fs.writeFileSync(sitemapPath, xmlContent, 'utf-8');
        
        console.log('✅ Sitemap generated at public/sitemap.xml');
        console.log(`📊 Size: ${(xmlContent.length / 1024).toFixed(2)} KB`);
      } catch (error) {
        console.error('❌ Error generating sitemap:', error);
      }
    }
  };
}
