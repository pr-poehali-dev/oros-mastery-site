'''
Business: RSS 2.0 feed generation for Rick and Morty blog
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with request_id
Returns: HTTP response with RSS XML feed
'''

import os
import psycopg2
from datetime import datetime
from typing import Dict, Any
from email.utils import formatdate
import time

# Transliteration map for slug generation (matching frontend logic)
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
    if not text:
        return ''
    return (str(text)
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;')
            .replace("'", '&apos;'))

def format_rfc822_date(date_value) -> str:
    """Format date to RFC 822 format for RSS pubDate"""
    if not date_value:
        return formatdate(timeval=time.time(), localtime=False, usegmt=True)
    
    try:
        if isinstance(date_value, str):
            # Try parsing different date formats
            for fmt in ['%Y-%m-%d', '%d.%m.%Y', '%d %b %Y', '%Y-%m-%d %H:%M:%S']:
                try:
                    dt = datetime.strptime(date_value, fmt)
                    timestamp = time.mktime(dt.timetuple())
                    return formatdate(timeval=timestamp, localtime=False, usegmt=True)
                except ValueError:
                    continue
        elif isinstance(date_value, datetime):
            timestamp = time.mktime(date_value.timetuple())
            return formatdate(timeval=timestamp, localtime=False, usegmt=True)
    except:
        pass
    
    # Fallback to current time
    return formatdate(timeval=time.time(), localtime=False, usegmt=True)

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
        base_url = 'https://oros-mastery-site.poehali.app'
        
        # Fetch blog posts ordered by date (newest first)
        cur.execute(
            "SELECT id, title, excerpt, date, author FROM blog_posts ORDER BY created_at DESC LIMIT 50"
        )
        blog_posts = cur.fetchall()
        
        # Start building RSS XML
        rss = '<?xml version="1.0" encoding="UTF-8"?>\n'
        rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n'
        rss += '  <channel>\n'
        rss += f'    <title>{escape_xml("Rick and Morty Fan Site - Блог")}</title>\n'
        rss += f'    <link>{escape_xml(base_url + "/blog")}</link>\n'
        rss += f'    <description>{escape_xml("Блог о Rick and Morty - теории, анализ эпизодов, интересные факты")}</description>\n'
        rss += '    <language>ru</language>\n'
        rss += f'    <lastBuildDate>{formatdate(timeval=time.time(), localtime=False, usegmt=True)}</lastBuildDate>\n'
        rss += '    <generator>Rick and Morty Fan Site RSS Generator</generator>\n'
        rss += f'    <atom:link href="{escape_xml(base_url + "/rss")}" rel="self" type="application/rss+xml" />\n'
        rss += '\n'
        
        # Add blog post items
        for post in blog_posts:
            post_id, title, excerpt, date, author = post
            slug = generate_slug(post_id, title)
            post_url = f"{base_url}/blog/{slug}"
            
            rss += '    <item>\n'
            rss += f'      <title>{escape_xml(title)}</title>\n'
            rss += f'      <link>{escape_xml(post_url)}</link>\n'
            rss += f'      <description>{escape_xml(excerpt or "")}</description>\n'
            rss += f'      <pubDate>{format_rfc822_date(date)}</pubDate>\n'
            rss += f'      <guid isPermaLink="true">{escape_xml(post_url)}</guid>\n'
            
            if author:
                rss += f'      <author>{escape_xml(author)}</author>\n'
            
            rss += '    </item>\n'
            rss += '\n'
        
        rss += '  </channel>\n'
        rss += '</rss>'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/rss+xml; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': rss
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
