import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def escape_sql(value: str) -> str:
    """Экранирование одинарных кавычек для SQL"""
    return value.replace("'", "''") if value else ''

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Универсальный CRUD API для контента (вселенные, персонажи, теории, статьи)
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
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            item_id = params.get('id')
            
            if content_type == 'articles':
                if item_id:
                    sql = f"SELECT * FROM episode_articles WHERE id = {int(item_id)}"
                else:
                    sql = "SELECT * FROM episode_articles ORDER BY created_at DESC"
                cursor.execute(sql)
                items = cursor.fetchall()
                result = [dict(i) for i in items] if not item_id else (dict(items[0]) if items else None)
            elif item_id:
                sql = f'SELECT * FROM {content_type} WHERE id = {int(item_id)}'
                cursor.execute(sql)
                item = cursor.fetchone()
                result = dict(item) if item else None
            else:
                sql = f'SELECT * FROM {content_type} ORDER BY created_at DESC'
                cursor.execute(sql)
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
                sql = (
                    f"INSERT INTO universes (name, description, image, status, features) "
                    f"VALUES ('{escape_sql(body_data.get('name', ''))}', "
                    f"'{escape_sql(body_data.get('description', ''))}', "
                    f"'{escape_sql(body_data.get('image', ''))}', "
                    f"'{escape_sql(body_data.get('status', ''))}', "
                    f"'{escape_sql(body_data.get('features', ''))}') RETURNING id"
                )
            elif content_type == 'characters':
                sql = (
                    f"INSERT INTO characters (name, description, image, background_image, status, abilities) "
                    f"VALUES ('{escape_sql(body_data.get('name', ''))}', "
                    f"'{escape_sql(body_data.get('description', ''))}', "
                    f"'{escape_sql(body_data.get('image', ''))}', "
                    f"'{escape_sql(body_data.get('background_image', ''))}', "
                    f"'{escape_sql(body_data.get('status', ''))}', "
                    f"'{escape_sql(body_data.get('abilities', ''))}') RETURNING id"
                )
            elif content_type == 'theories':
                sql = (
                    f"INSERT INTO theories (title, description, image, status, evidence) "
                    f"VALUES ('{escape_sql(body_data.get('title', ''))}', "
                    f"'{escape_sql(body_data.get('description', ''))}', "
                    f"'{escape_sql(body_data.get('image', ''))}', "
                    f"'{escape_sql(body_data.get('status', ''))}', "
                    f"'{escape_sql(body_data.get('evidence', ''))}') RETURNING id"
                )
            elif content_type == 'articles':
                episode_id = int(body_data.get('episodeId', 0))
                sql = (
                    f"INSERT INTO episode_articles (episode_id, title, content) "
                    f"VALUES ({episode_id}, "
                    f"'{escape_sql(body_data.get('title', ''))}', "
                    f"'{escape_sql(body_data.get('content', ''))}') RETURNING id"
                )
            
            cursor.execute(sql)
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
                sql = (
                    f"UPDATE universes SET "
                    f"name='{escape_sql(body_data.get('name', ''))}', "
                    f"description='{escape_sql(body_data.get('description', ''))}', "
                    f"image='{escape_sql(body_data.get('image', ''))}', "
                    f"status='{escape_sql(body_data.get('status', ''))}', "
                    f"features='{escape_sql(body_data.get('features', ''))}', "
                    f"updated_at=CURRENT_TIMESTAMP WHERE id={int(item_id)}"
                )
            elif content_type == 'characters':
                sql = (
                    f"UPDATE characters SET "
                    f"name='{escape_sql(body_data.get('name', ''))}', "
                    f"description='{escape_sql(body_data.get('description', ''))}', "
                    f"image='{escape_sql(body_data.get('image', ''))}', "
                    f"background_image='{escape_sql(body_data.get('background_image', ''))}', "
                    f"status='{escape_sql(body_data.get('status', ''))}', "
                    f"abilities='{escape_sql(body_data.get('abilities', ''))}', "
                    f"updated_at=CURRENT_TIMESTAMP WHERE id={int(item_id)}"
                )
            elif content_type == 'theories':
                sql = (
                    f"UPDATE theories SET "
                    f"title='{escape_sql(body_data.get('title', ''))}', "
                    f"description='{escape_sql(body_data.get('description', ''))}', "
                    f"image='{escape_sql(body_data.get('image', ''))}', "
                    f"status='{escape_sql(body_data.get('status', ''))}', "
                    f"evidence='{escape_sql(body_data.get('evidence', ''))}', "
                    f"updated_at=CURRENT_TIMESTAMP WHERE id={int(item_id)}"
                )
            elif content_type == 'articles':
                episode_id = int(body_data.get('episodeId', 0))
                sql = (
                    f"UPDATE episode_articles SET "
                    f"episode_id={episode_id}, "
                    f"title='{escape_sql(body_data.get('title', ''))}', "
                    f"content='{escape_sql(body_data.get('content', ''))}' "
                    f"WHERE id={int(item_id)}"
                )
            
            cursor.execute(sql)
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
            
            table_name = 'episode_articles' if content_type == 'articles' else content_type
            sql = f'DELETE FROM {table_name} WHERE id = {int(item_id)}'
            cursor.execute(sql)
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
