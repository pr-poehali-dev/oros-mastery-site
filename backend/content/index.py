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
                    f"INSERT INTO characters (name, role, species, bio, full_bio, image, background_image, avatar_image, "
                    f"status, abilities, origin, first_appearance, occupation, affiliation, family, notable_episodes, personality, goals) "
                    f"VALUES ('{escape_sql(body_data.get('name', ''))}', "
                    f"'{escape_sql(body_data.get('role', ''))}', "
                    f"'{escape_sql(body_data.get('species', ''))}', "
                    f"'{escape_sql(body_data.get('bio', ''))}', "
                    f"'{escape_sql(body_data.get('full_bio', ''))}', "
                    f"'{escape_sql(body_data.get('image', ''))}', "
                    f"'{escape_sql(body_data.get('background_image', ''))}', "
                    f"'{escape_sql(body_data.get('avatar_image', ''))}', "
                    f"'{escape_sql(body_data.get('status', ''))}', "
                    f"'{escape_sql(body_data.get('abilities', ''))}', "
                    f"'{escape_sql(body_data.get('origin', ''))}', "
                    f"'{escape_sql(body_data.get('first_appearance', ''))}', "
                    f"'{escape_sql(body_data.get('occupation', ''))}', "
                    f"'{escape_sql(body_data.get('affiliation', ''))}', "
                    f"'{escape_sql(body_data.get('family', ''))}', "
                    f"'{escape_sql(body_data.get('notable_episodes', ''))}', "
                    f"'{escape_sql(body_data.get('personality', ''))}', "
                    f"'{escape_sql(body_data.get('goals', ''))}') RETURNING id"
                )
            elif content_type == 'theories':
                published_date = body_data.get('published_date', '')
                date_clause = f"'{published_date}'" if published_date else 'NULL'
                sql = (
                    f"INSERT INTO theories (title, type, probability, author, votes, views, likes, "
                    f"published_date, summary, full_text, evidence, counter_arguments, "
                    f"related_episodes, related_characters, impact_level, category, image, "
                    f"background_image, description, status) "
                    f"VALUES ('{escape_sql(body_data.get('title', ''))}', "
                    f"'{escape_sql(body_data.get('type', 'character'))}', "
                    f"'{escape_sql(body_data.get('probability', 'medium'))}', "
                    f"'{escape_sql(body_data.get('author', ''))}', "
                    f"{int(body_data.get('votes', 0))}, "
                    f"{int(body_data.get('views', 0))}, "
                    f"{int(body_data.get('likes', 0))}, "
                    f"{date_clause}, "
                    f"'{escape_sql(body_data.get('summary', ''))}', "
                    f"'{escape_sql(body_data.get('full_text', ''))}', "
                    f"'{escape_sql(body_data.get('evidence', ''))}', "
                    f"'{escape_sql(body_data.get('counter_arguments', ''))}', "
                    f"'{escape_sql(body_data.get('related_episodes', ''))}', "
                    f"'{escape_sql(body_data.get('related_characters', ''))}', "
                    f"'{escape_sql(body_data.get('impact_level', ''))}', "
                    f"'{escape_sql(body_data.get('category', ''))}', "
                    f"'{escape_sql(body_data.get('image', ''))}', "
                    f"'{escape_sql(body_data.get('background_image', ''))}', "
                    f"'{escape_sql(body_data.get('description', ''))}', "
                    f"'{escape_sql(body_data.get('status', 'draft'))}') RETURNING id"
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
            print(f'PUT request - content_type: {content_type}, item_id: {item_id}')
            if not item_id:
                print('ERROR: No ID in params')
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID required'}),
                    'isBase64Encoded': False
                }
            
            body_data = json.loads(event.get('body', '{}'))
            print(f'Body data keys: {list(body_data.keys())}')
            
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
                    f"role='{escape_sql(body_data.get('role', ''))}', "
                    f"species='{escape_sql(body_data.get('species', ''))}', "
                    f"bio='{escape_sql(body_data.get('bio', ''))}', "
                    f"full_bio='{escape_sql(body_data.get('full_bio', ''))}', "
                    f"image='{escape_sql(body_data.get('image', ''))}', "
                    f"background_image='{escape_sql(body_data.get('background_image', ''))}', "
                    f"avatar_image='{escape_sql(body_data.get('avatar_image', ''))}', "
                    f"status='{escape_sql(body_data.get('status', ''))}', "
                    f"abilities='{escape_sql(body_data.get('abilities', ''))}', "
                    f"origin='{escape_sql(body_data.get('origin', ''))}', "
                    f"first_appearance='{escape_sql(body_data.get('first_appearance', ''))}', "
                    f"occupation='{escape_sql(body_data.get('occupation', ''))}', "
                    f"affiliation='{escape_sql(body_data.get('affiliation', ''))}', "
                    f"family='{escape_sql(body_data.get('family', ''))}', "
                    f"notable_episodes='{escape_sql(body_data.get('notable_episodes', ''))}', "
                    f"personality='{escape_sql(body_data.get('personality', ''))}', "
                    f"goals='{escape_sql(body_data.get('goals', ''))}', "
                    f"updated_at=CURRENT_TIMESTAMP WHERE id={int(item_id)}"
                )
            elif content_type == 'theories':
                published_date = body_data.get('published_date', '')
                date_clause = f"'{published_date}'" if published_date else 'NULL'
                sql = (
                    f"UPDATE theories SET "
                    f"title='{escape_sql(body_data.get('title', ''))}', "
                    f"type='{escape_sql(body_data.get('type', 'character'))}', "
                    f"probability='{escape_sql(body_data.get('probability', 'medium'))}', "
                    f"author='{escape_sql(body_data.get('author', ''))}', "
                    f"votes={int(body_data.get('votes', 0))}, "
                    f"views={int(body_data.get('views', 0))}, "
                    f"likes={int(body_data.get('likes', 0))}, "
                    f"published_date={date_clause}, "
                    f"summary='{escape_sql(body_data.get('summary', ''))}', "
                    f"full_text='{escape_sql(body_data.get('full_text', ''))}', "
                    f"evidence='{escape_sql(body_data.get('evidence', ''))}', "
                    f"counter_arguments='{escape_sql(body_data.get('counter_arguments', ''))}', "
                    f"related_episodes='{escape_sql(body_data.get('related_episodes', ''))}', "
                    f"related_characters='{escape_sql(body_data.get('related_characters', ''))}', "
                    f"impact_level='{escape_sql(body_data.get('impact_level', ''))}', "
                    f"category='{escape_sql(body_data.get('category', ''))}', "
                    f"image='{escape_sql(body_data.get('image', ''))}', "
                    f"background_image='{escape_sql(body_data.get('background_image', ''))}', "
                    f"description='{escape_sql(body_data.get('description', ''))}', "
                    f"status='{escape_sql(body_data.get('status', 'draft'))}', "
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