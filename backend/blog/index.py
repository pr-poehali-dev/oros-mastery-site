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
            
            post_id = body.get('id')
            title = body.get('title', '').replace("'", "''")
            excerpt = body.get('excerpt', '').replace("'", "''")
            content = body.get('content', '').replace("'", "''")
            author = body.get('author', '').replace("'", "''")
            date_val = body.get('date', '').replace("'", "''")
            read_time = body.get('read_time', '5 мин').replace("'", "''")
            image = body.get('image', '').replace("'", "''")
            category = body.get('category', '').replace("'", "''")
            views = int(body.get('views', 0))
            likes = int(body.get('likes', 0))
            tags = body.get('tags', [])
            
            if post_id:
                cur.execute(
                    f"UPDATE blog_posts SET title='{title}', excerpt='{excerpt}', content='{content}', author='{author}', date='{date_val}', read_time='{read_time}', image='{image}', category='{category}', views={views}, likes={likes} WHERE id={int(post_id)}"
                )
                cur.execute(f"DELETE FROM blog_tags WHERE post_id = {int(post_id)}")
                for tag in tags:
                    tag_clean = tag.replace("'", "''")
                    cur.execute(
                        f"INSERT INTO blog_tags (post_id, tag) VALUES ({int(post_id)}, '{tag_clean}')"
                    )
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'id': post_id, 'message': 'Post updated'})
                }
            else:
                cur.execute(
                    f"INSERT INTO blog_posts (title, excerpt, content, author, date, read_time, image, category, views, likes) VALUES ('{title}', '{excerpt}', '{content}', '{author}', '{date_val}', '{read_time}', '{image}', '{category}', 0, 0) RETURNING id"
                )
                new_post_id = cur.fetchone()[0]
                
                for tag in tags:
                    tag_clean = tag.replace("'", "''")
                    cur.execute(
                        f"INSERT INTO blog_tags (post_id, tag) VALUES ({new_post_id}, '{tag_clean}')"
                    )
                
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'id': new_post_id, 'message': 'Post created'})
                }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters') or {}
            post_id = query_params.get('id')
            
            if not post_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Post ID required'})
                }
            
            cur.execute(f"DELETE FROM blog_tags WHERE post_id = {int(post_id)}")
            cur.execute(f"DELETE FROM blog_comments WHERE post_id = {int(post_id)}")
            cur.execute(f"DELETE FROM blog_posts WHERE id = {int(post_id)}")
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'Post deleted'})
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