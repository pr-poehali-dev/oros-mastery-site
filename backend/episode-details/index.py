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
            
            action = query_params.get('action')
            
            if action == 'get_navigation':
                current_id = int(query_params.get('current_id', 0))
                direction = query_params.get('direction', 'next')
                
                if direction == 'next':
                    cur.execute("SELECT id, title FROM episodes WHERE id > " + str(current_id) + " ORDER BY id ASC LIMIT 1")
                else:
                    cur.execute("SELECT id, title FROM episodes WHERE id < " + str(current_id) + " ORDER BY id DESC LIMIT 1")
                
                nav_row = cur.fetchone()
                if nav_row:
                    return {
                        'statusCode': 200,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'episode': {'id': nav_row[0], 'title': nav_row[1]}})
                    }
                else:
                    return {
                        'statusCode': 404,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'No more episodes'})
                    }
            
            cur.execute(
                "SELECT id, title, season, episode, description, image, air_date, video_iframe, fun_facts, likes, views FROM episodes WHERE id = " + str(int(episode_id))
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
                'videoIframe': row[7] if len(row) > 7 and row[7] else '',
                'funFacts': row[8] if len(row) > 8 and row[8] else '',
                'likes': row[9] if len(row) > 9 else 0,
                'views': row[10] if len(row) > 10 else 0
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
                "SELECT ea.id, ea.title, ea.content, ea.created_at FROM episode_articles ea LEFT JOIN episode_article_links eal ON ea.id = eal.article_id WHERE eal.episode_id = " + str(int(episode_id)) + " OR ea.episode_id = " + str(int(episode_id)) + " ORDER BY ea.created_at DESC"
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
            query_params = event.get('queryStringParameters') or {}
            action = query_params.get('action')
            
            if action == 'increment_views':
                episode_id = int(query_params.get('id'))
                cur.execute("UPDATE episodes SET views = COALESCE(views, 0) + 1 WHERE id = " + str(episode_id))
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'message': 'Views incremented'})
                }
            
            if action == 'increment_likes':
                episode_id = int(query_params.get('id'))
                cur.execute("UPDATE episodes SET likes = COALESCE(likes, 0) + 1 WHERE id = " + str(episode_id))
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'message': 'Likes incremented'})
                }
            
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