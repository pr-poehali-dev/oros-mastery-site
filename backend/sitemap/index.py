'''
Business: Dynamic XML sitemap generation for Rick and Morty fan site
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with request_id
Returns: HTTP response with XML sitemap
'''

import os
import psycopg2
from datetime import datetime
from typing import Dict, Any, List, Tuple

# Transliteration map for slug generation
TRANSLIT_MAP = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
}

def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    result = ''
    for char in text.lower():
        result += TRANSLIT_MAP.get(char, char)
    
    # Replace non-alphanumeric with hyphens
    slug = ''
    for char in result:
        if char.isalnum():
            slug += char
        elif slug and slug[-1] != '-':
            slug += '-'
    
    # Remove leading/trailing hyphens and limit length
    return slug.strip('-')[:100]

def generate_slug(post_id: int, title: str) -> str:
    """Generate full slug with ID prefix"""
    return f"{post_id}-{slugify(title)}"

def escape_xml(text: str) -> str:
    """Escape special XML characters"""
    return (text
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;')
            .replace("'", '&apos;'))

def format_date(date_value) -> str:
    """Format date to YYYY-MM-DD"""
    if isinstance(date_value, str):
        try:
            date_value = datetime.fromisoformat(date_value.replace('Z', '+00:00'))
        except:
            return datetime.now().strftime('%Y-%m-%d')
    
    if isinstance(date_value, datetime):
        return date_value.strftime('%Y-%m-%d')
    
    return datetime.now().strftime('%Y-%m-%d')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': '{"error": "Method not allowed"}'
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': '{"error": "Database URL not configured"}'
        }
    
    conn = None
    cur = None
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Base URL for the site
        base_url = 'https://yoursite.poehali.dev'
        today = datetime.now().strftime('%Y-%m-%d')
        
        # Fetch blog posts
        cur.execute(
            "SELECT id, title, date, image, updated_at FROM blog_posts ORDER BY id"
        )
        blog_posts = cur.fetchall()
        
        # Fetch episodes
        cur.execute(
            "SELECT id, title, updated_at FROM episodes ORDER BY id"
        )
        episodes = cur.fetchall()
        
        # Start building XML
        xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n'
        
        # Main pages
        main_pages = [
            {'loc': '/', 'priority': '1.0', 'changefreq': 'daily'},
            {'loc': '/episodes', 'priority': '0.9', 'changefreq': 'weekly'},
            {'loc': '/blog', 'priority': '0.8', 'changefreq': 'weekly'},
            {'loc': '/about', 'priority': '0.5', 'changefreq': 'monthly'},
            {'loc': '/contact', 'priority': '0.5', 'changefreq': 'monthly'}
        ]
        
        for page in main_pages:
            xml += '  <url>\n'
            xml += f'    <loc>{escape_xml(base_url + page["loc"])}</loc>\n'
            xml += f'    <lastmod>{today}</lastmod>\n'
            xml += f'    <changefreq>{page["changefreq"]}</changefreq>\n'
            xml += f'    <priority>{page["priority"]}</priority>\n'
            xml += '  </url>\n\n'
        
        # Blog posts
        for post in blog_posts:
            post_id, title, date, image, updated_at = post
            slug = generate_slug(post_id, title)
            lastmod = format_date(updated_at) if updated_at else (format_date(date) if date else today)
            
            xml += '  <url>\n'
            xml += f'    <loc>{escape_xml(base_url + "/blog/" + slug)}</loc>\n'
            xml += f'    <lastmod>{lastmod}</lastmod>\n'
            xml += '    <changefreq>monthly</changefreq>\n'
            xml += '    <priority>0.7</priority>\n'
            
            # Add image if available
            if image:
                xml += '    <image:image>\n'
                xml += f'      <image:loc>{escape_xml(image)}</image:loc>\n'
                xml += f'      <image:title>{escape_xml(title)}</image:title>\n'
                xml += '    </image:image>\n'
            
            xml += '  </url>\n\n'
        
        # Episodes
        for episode in episodes:
            episode_id, title, updated_at = episode
            lastmod = format_date(updated_at) if updated_at else today
            
            xml += '  <url>\n'
            xml += f'    <loc>{escape_xml(base_url + "/episodes/" + str(episode_id))}</loc>\n'
            xml += f'    <lastmod>{lastmod}</lastmod>\n'
            xml += '    <changefreq>monthly</changefreq>\n'
            xml += '    <priority>0.6</priority>\n'
            xml += '  </url>\n\n'
        
        xml += '</urlset>'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/xml',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': xml
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': f'{{"error": "Internal server error", "message": "{str(e)}"}}'
        }
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
