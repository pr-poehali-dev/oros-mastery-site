import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Универсальный CRUD API для всего контента (вселенные, персонажи, теории)
    Args: event - dict с httpMethod, body, queryStringParameters, pathParams
          context - объект с request_id
    Returns: HTTP response dict с данными контента
    '''
    method: str = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    content_type = params.get('type', 'universes')  # universes, characters, theories
    
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
            'body': ''
        }
    
    # Подключение к БД
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            item_id = params.get('id')
            
            if item_id:
                cursor.execute(f'SELECT * FROM {content_type} WHERE id = ' + str(int(item_id)))
                item = cursor.fetchone()
                result = dict(item) if item else None
            else:
                cursor.execute(f'SELECT * FROM {content_type} ORDER BY id ASC')
                items = cursor.fetchall()
                result = [dict(i) for i in items]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, default=str)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            if content_type == 'universes':
                cursor.execute(
                    "INSERT INTO universes (name, description, image, status, features) "
                    "VALUES ('" + body_data['name'].replace("'", "''") + "', "
                    "'" + body_data['description'].replace("'", "''") + "', "
                    "'" + body_data.get('image', '').replace("'", "''") + "', "
                    "'" + body_data.get('status', '').replace("'", "''") + "', "
                    "'" + body_data.get('features', '').replace("'", "''") + "') "
                    "RETURNING id"
                )
            elif content_type == 'characters':
                cursor.execute(
                    "INSERT INTO characters (name, role, species, status, bio, full_bio, image, abilities) "
                    "VALUES ('" + body_data['name'].replace("'", "''") + "', "
                    "'" + body_data['role'].replace("'", "''") + "', "
                    "'" + body_data['species'].replace("'", "''") + "', "
                    "'" + body_data.get('status', '').replace("'", "''") + "', "
                    "'" + body_data['bio'].replace("'", "''") + "', "
                    "'" + body_data.get('full_bio', body_data['bio']).replace("'", "''") + "', "
                    "'" + body_data.get('image', '').replace("'", "''") + "', "
                    "'" + body_data.get('abilities', '').replace("'", "''") + "') "
                    "RETURNING id"
                )
            elif content_type == 'theories':
                cursor.execute(
                    "INSERT INTO theories (title, type, probability, author, votes, summary, full_text, "
                    "evidence, counter_arguments, image) "
                    "VALUES ('" + body_data['title'].replace("'", "''") + "', "
                    "'" + body_data['type'].replace("'", "''") + "', "
                    "'" + body_data['probability'].replace("'", "''") + "', "
                    "'" + body_data['author'].replace("'", "''") + "', 0, "
                    "'" + body_data['summary'].replace("'", "''") + "', "
                    "'" + body_data['fullText'].replace("'", "''") + "', "
                    "'" + body_data.get('evidence', '').replace("'", "''") + "', "
                    "'" + body_data.get('counterArguments', '').replace("'", "''") + "', "
                    "'" + body_data.get('image', '').replace("'", "''") + "') "
                    "RETURNING id"
                )
            
            new_id = cursor.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': new_id, 'message': f'{content_type.title()[:-1]} created'})
            }
        
        elif method == 'PUT':
            item_id = params.get('id')
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID required'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            if content_type == 'universes':
                cursor.execute(
                    "UPDATE universes SET "
                    "name = '" + body_data['name'].replace("'", "''") + "', "
                    "description = '" + body_data['description'].replace("'", "''") + "', "
                    "image = '" + body_data.get('image', '').replace("'", "''") + "', "
                    "status = '" + body_data.get('status', '').replace("'", "''") + "', "
                    "features = '" + body_data.get('features', '').replace("'", "''") + "', "
                    "updated_at = CURRENT_TIMESTAMP "
                    "WHERE id = " + str(int(item_id))
                )
            elif content_type == 'characters':
                cursor.execute(
                    "UPDATE characters SET "
                    "name = '" + body_data['name'].replace("'", "''") + "', "
                    "role = '" + body_data['role'].replace("'", "''") + "', "
                    "species = '" + body_data['species'].replace("'", "''") + "', "
                    "status = '" + body_data.get('status', '').replace("'", "''") + "', "
                    "bio = '" + body_data['bio'].replace("'", "''") + "', "
                    "full_bio = '" + body_data.get('full_bio', body_data['bio']).replace("'", "''") + "', "
                    "image = '" + body_data.get('image', '').replace("'", "''") + "', "
                    "abilities = '" + body_data.get('abilities', '').replace("'", "''") + "', "
                    "updated_at = CURRENT_TIMESTAMP "
                    "WHERE id = " + str(int(item_id))
                )
            elif content_type == 'theories':
                cursor.execute(
                    "UPDATE theories SET "
                    "title = '" + body_data['title'].replace("'", "''") + "', "
                    "type = '" + body_data['type'].replace("'", "''") + "', "
                    "probability = '" + body_data['probability'].replace("'", "''") + "', "
                    "author = '" + body_data['author'].replace("'", "''") + "', "
                    "summary = '" + body_data['summary'].replace("'", "''") + "', "
                    "full_text = '" + body_data['fullText'].replace("'", "''") + "', "
                    "evidence = '" + body_data.get('evidence', '').replace("'", "''") + "', "
                    "counter_arguments = '" + body_data.get('counterArguments', '').replace("'", "''") + "', "
                    "image = '" + body_data.get('image', '').replace("'", "''") + "', "
                    "updated_at = CURRENT_TIMESTAMP "
                    "WHERE id = " + str(int(item_id))
                )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': f'{content_type.title()[:-1]} updated'})
            }
        
        elif method == 'DELETE':
            item_id = params.get('id')
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID required'})
                }
            
            cursor.execute(f'DELETE FROM {content_type} WHERE id = ' + str(int(item_id)))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': f'{content_type.title()[:-1]} deleted'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    finally:
        cursor.close()
        conn.close()
