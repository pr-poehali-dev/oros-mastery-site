import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Универсальный CRUD API для всего контента (вселенные, персонажи, теории)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response dict с данными контента
    '''
    method: str = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    content_type = params.get('type', 'universes')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    # Подключение к БД
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            item_id = params.get('id')
            
            if item_id:
                cursor.execute(f'SELECT * FROM {content_type} WHERE id = {int(item_id)}')
                item = cursor.fetchone()
                result = dict(item) if item else None
            else:
                cursor.execute(f'SELECT * FROM {content_type} ORDER BY created_at DESC')
                items = cursor.fetchall()
                result = [dict(i) for i in items]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            if content_type == 'universes':
                cursor.execute(
                    "INSERT INTO universes (name, description, image, status, features) "
                    "VALUES (%s, %s, %s, %s, %s) RETURNING id",
                    (
                        body_data.get('name', ''),
                        body_data.get('description', ''),
                        body_data.get('image', ''),
                        body_data.get('status', ''),
                        body_data.get('features', '')
                    )
                )
            elif content_type == 'characters':
                cursor.execute(
                    "INSERT INTO characters (name, description, image, background_image, status, abilities) "
                    "VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
                    (
                        body_data.get('name', ''),
                        body_data.get('description', ''),
                        body_data.get('image', ''),
                        body_data.get('background_image', ''),
                        body_data.get('status', ''),
                        body_data.get('abilities', '')
                    )
                )
            elif content_type == 'theories':
                cursor.execute(
                    "INSERT INTO theories (title, description, image, status, evidence) "
                    "VALUES (%s, %s, %s, %s, %s) RETURNING id",
                    (
                        body_data.get('title', ''),
                        body_data.get('description', ''),
                        body_data.get('image', ''),
                        body_data.get('status', ''),
                        body_data.get('evidence', '')
                    )
                )
            
            new_id = cursor.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': new_id, 'message': f'{content_type} created'}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            item_id = params.get('id')
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID required'}),
                    'isBase64Encoded': False
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            if content_type == 'universes':
                cursor.execute(
                    "UPDATE universes SET name=%s, description=%s, image=%s, status=%s, features=%s, "
                    "updated_at=CURRENT_TIMESTAMP WHERE id=%s",
                    (
                        body_data.get('name', ''),
                        body_data.get('description', ''),
                        body_data.get('image', ''),
                        body_data.get('status', ''),
                        body_data.get('features', ''),
                        int(item_id)
                    )
                )
            elif content_type == 'characters':
                cursor.execute(
                    "UPDATE characters SET name=%s, description=%s, image=%s, background_image=%s, "
                    "status=%s, abilities=%s, updated_at=CURRENT_TIMESTAMP WHERE id=%s",
                    (
                        body_data.get('name', ''),
                        body_data.get('description', ''),
                        body_data.get('image', ''),
                        body_data.get('background_image', ''),
                        body_data.get('status', ''),
                        body_data.get('abilities', ''),
                        int(item_id)
                    )
                )
            elif content_type == 'theories':
                cursor.execute(
                    "UPDATE theories SET title=%s, description=%s, image=%s, status=%s, evidence=%s, "
                    "updated_at=CURRENT_TIMESTAMP WHERE id=%s",
                    (
                        body_data.get('title', ''),
                        body_data.get('description', ''),
                        body_data.get('image', ''),
                        body_data.get('status', ''),
                        body_data.get('evidence', ''),
                        int(item_id)
                    )
                )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': f'{content_type} updated'}),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            item_id = params.get('id')
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(f'DELETE FROM {content_type} WHERE id = {int(item_id)}')
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': f'{content_type} deleted'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cursor.close()
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
