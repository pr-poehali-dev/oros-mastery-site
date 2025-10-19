'''
Business: API для получения деталей эпизода с комментариями и статьями
Args: event - dict с httpMethod, body, queryStringParameters (id)
      context - object с request_id
Returns: HTTP response dict с данными эпизода, комментариями и статьями
'''

import json
import os
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Database URL not configured'})
        }
    
    conn = None
    cur = None
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            episode_id = query_params.get('id')
            
            if not episode_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Episode ID required'})
                }
            
            cur.execute(
                "SELECT id, title, season, episode, description, image, air_date, video_iframe FROM episodes WHERE id = " + str(int(episode_id))
            )
            row = cur.fetchone()
            
            if not row:
                return {
                    'statusCode': 404,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Episode not found'})
                }
            
            episode = {
                'id': row[0],
                'title': row[1],
                'season': row[2],
                'episode': row[3],
                'description': row[4],
                'image': row[5],
                'airDate': row[6] if row[6] else '',
                'videoIframe': row[7] if len(row) > 7 and row[7] else ''
            }
            
            cur.execute(
                "SELECT id, author_name, author_avatar, comment_text, rating, created_at FROM episode_comments WHERE episode_id = " + str(int(episode_id)) + " ORDER BY created_at DESC"
            )
            comments = []
            for comment_row in cur.fetchall():
                comments.append({
                    'id': comment_row[0],
                    'authorName': comment_row[1],
                    'authorAvatar': comment_row[2],
                    'text': comment_row[3],
                    'rating': comment_row[4],
                    'createdAt': comment_row[5].isoformat() if comment_row[5] else None
                })
            
            cur.execute(
                "SELECT id, title, content, created_at FROM episode_articles WHERE episode_id = " + str(int(episode_id)) + " ORDER BY created_at DESC"
            )
            articles = []
            for article_row in cur.fetchall():
                articles.append({
                    'id': article_row[0],
                    'title': article_row[1],
                    'content': article_row[2],
                    'createdAt': article_row[3].isoformat() if article_row[3] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({
                    'episode': episode,
                    'comments': comments,
                    'articles': articles
                })
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'add_comment':
                episode_id = int(body.get('episodeId'))
                author_name = body.get('authorName', '').replace("'", "''")
                author_avatar = body.get('authorAvatar', '').replace("'", "''")
                comment_text = body.get('text', '').replace("'", "''")
                rating = int(body.get('rating', 0))
                
                cur.execute(
                    f"INSERT INTO episode_comments (episode_id, author_name, author_avatar, comment_text, rating) VALUES ({episode_id}, '{author_name}', '{author_avatar}', '{comment_text}', {rating}) RETURNING id"
                )
                comment_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'id': comment_id, 'message': 'Comment added'})
                }
            
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid action'})
            }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()