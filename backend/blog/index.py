'''
Business: API для работы с блогом - статьи и комментарии
Args: event - dict с httpMethod, body, queryStringParameters, path
      context - object с request_id
Returns: HTTP response dict
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
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
            post_id = query_params.get('id')
            
            if post_id:
                cur.execute(
                    "SELECT id, title, excerpt, content, author, date, read_time, image, category, views, likes FROM blog_posts WHERE id = " + str(int(post_id))
                )
                row = cur.fetchone()
                
                if not row:
                    return {
                        'statusCode': 404,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Post not found'})
                    }
                
                post = {
                    'id': row[0],
                    'title': row[1],
                    'excerpt': row[2],
                    'content': row[3],
                    'author': row[4],
                    'date': row[5],
                    'readTime': row[6],
                    'image': row[7],
                    'category': row[8],
                    'views': row[9],
                    'likes': row[10]
                }
                
                cur.execute("SELECT tag FROM blog_tags WHERE post_id = " + str(int(post_id)))
                tags = [row[0] for row in cur.fetchall()]
                post['tags'] = tags
                
                cur.execute(
                    "SELECT id, author, avatar, date, text, likes FROM blog_comments WHERE post_id = " + str(int(post_id)) + " ORDER BY created_at DESC"
                )
                comments = []
                for row in cur.fetchall():
                    comments.append({
                        'id': row[0],
                        'author': row[1],
                        'avatar': row[2],
                        'date': row[3],
                        'text': row[4],
                        'likes': row[5]
                    })
                post['comments'] = comments
                
                cur.execute("UPDATE blog_posts SET views = views + 1 WHERE id = " + str(int(post_id)))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps(post)
                }
            
            else:
                cur.execute(
                    "SELECT id, title, excerpt, content, author, date, read_time, image, category, views, likes FROM blog_posts ORDER BY created_at DESC"
                )
                posts = []
                for row in cur.fetchall():
                    post = {
                        'id': row[0],
                        'title': row[1],
                        'excerpt': row[2],
                        'content': row[3],
                        'author': row[4],
                        'date': row[5],
                        'readTime': row[6],
                        'image': row[7],
                        'category': row[8],
                        'views': row[9],
                        'likes': row[10]
                    }
                    
                    cur.execute("SELECT tag FROM blog_tags WHERE post_id = " + str(post['id']))
                    tags = [t[0] for t in cur.fetchall()]
                    post['tags'] = tags
                    
                    posts.append(post)
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps(posts)
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if body.get('type') == 'comment':
                post_id = body.get('post_id')
                author = body.get('author', '').replace("'", "''")
                text = body.get('text', '').replace("'", "''")
                avatar = body.get('avatar', '👤')
                date = body.get('date', '1 день назад')
                
                cur.execute(
                    f"INSERT INTO blog_comments (post_id, author, avatar, date, text, likes) VALUES ({int(post_id)}, '{author}', '{avatar}', '{date}', '{text}', 0) RETURNING id"
                )
                comment_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'id': comment_id, 'message': 'Comment created'})
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
