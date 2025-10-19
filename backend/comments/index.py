import json
import os
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с комментариями к статьям блога
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id и другими атрибутами
    Returns: HTTP response dict с комментариями или статусом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Подключение к базе данных
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database URL not configured'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            # Получение комментариев для статьи
            params = event.get('queryStringParameters') or {}
            article_id = params.get('article_id')
            
            if not article_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'article_id is required'})
                }
            
            query = '''
                SELECT id, article_id, author_name, comment_text, created_at
                FROM comments
                WHERE article_id = %s AND is_approved = TRUE
                ORDER BY created_at DESC
            '''
            cursor.execute(query, (article_id,))
            comments = cursor.fetchall()
            
            # Конвертация datetime в строку для JSON
            for comment in comments:
                if isinstance(comment.get('created_at'), datetime):
                    comment['created_at'] = comment['created_at'].isoformat()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'comments': comments})
            }
        
        elif method == 'POST':
            # Добавление нового комментария
            body_data = json.loads(event.get('body', '{}'))
            
            article_id = body_data.get('article_id')
            author_name = body_data.get('author_name', '').strip()
            author_email = body_data.get('author_email', '').strip()
            comment_text = body_data.get('comment_text', '').strip()
            
            # Валидация
            if not article_id or not author_name or not comment_text:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'article_id, author_name and comment_text are required'})
                }
            
            if len(author_name) > 100:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'author_name too long (max 100 characters)'})
                }
            
            if len(comment_text) > 2000:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'comment_text too long (max 2000 characters)'})
                }
            
            # Вставка комментария
            insert_query = '''
                INSERT INTO comments (article_id, author_name, author_email, comment_text)
                VALUES (%s, %s, %s, %s)
                RETURNING id, created_at
            '''
            cursor.execute(insert_query, (article_id, author_name, author_email or None, comment_text))
            result = cursor.fetchone()
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'comment_id': result['id'],
                    'created_at': result['created_at'].isoformat() if isinstance(result['created_at'], datetime) else result['created_at']
                })
            }
        
        else:
            cursor.close()
            conn.close()
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except psycopg2.Error as e:
        if 'conn' in locals() and conn:
            conn.close()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Database error: {str(e)}'})
        }
    except Exception as e:
        if 'conn' in locals() and conn:
            conn.close()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }
