'''
Business: API для управления эпизодами Rick and Morty
Args: event - dict с httpMethod, body, queryStringParameters
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
            season = query_params.get('season')
            
            if season:
                cur.execute(
                    "SELECT id, title, season, episode, description, image, air_date, video_iframe FROM episodes WHERE season = " + str(int(season)) + " ORDER BY episode"
                )
            else:
                cur.execute(
                    "SELECT id, title, season, episode, description, image, air_date, video_iframe FROM episodes ORDER BY season, episode"
                )
            
            episodes = []
            for row in cur.fetchall():
                episodes.append({
                    'id': row[0],
                    'title': row[1],
                    'season': row[2],
                    'episode': row[3],
                    'description': row[4],
                    'image': row[5],
                    'airDate': row[6] if row[6] else '',
                    'videoIframe': row[7] if len(row) > 7 and row[7] else ''
                })
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps(episodes)
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            title = body.get('title', '').replace("'", "''")
            season = int(body.get('season'))
            episode = int(body.get('episode'))
            description = body.get('description', '').replace("'", "''")
            image = body.get('image', '').replace("'", "''")
            air_date = body.get('airDate', '').replace("'", "''")
            video_iframe = body.get('videoIframe', '').replace("'", "''")
            
            cur.execute(
                f"INSERT INTO episodes (title, season, episode, description, image, air_date, video_iframe) VALUES ('{title}', {season}, {episode}, '{description}', '{image}', '{air_date}', '{video_iframe}') RETURNING id"
            )
            episode_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'id': episode_id, 'message': 'Episode created'})
            }
        
        elif method == 'PUT':
            query_params = event.get('queryStringParameters') or {}
            episode_id = query_params.get('id')
            
            if not episode_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Episode ID required'})
                }
            
            body = json.loads(event.get('body', '{}'))
            
            title = body.get('title', '').replace("'", "''")
            season = int(body.get('season'))
            episode = int(body.get('episode'))
            description = body.get('description', '').replace("'", "''")
            image = body.get('image', '').replace("'", "''")
            air_date = body.get('airDate', '').replace("'", "''")
            video_iframe = body.get('videoIframe', '').replace("'", "''")
            
            cur.execute(
                f"UPDATE episodes SET title='{title}', season={season}, episode={episode}, description='{description}', image='{image}', air_date='{air_date}', video_iframe='{video_iframe}' WHERE id={int(episode_id)}"
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'Episode updated'})
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters') or {}
            episode_id = query_params.get('id')
            
            if not episode_id:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Episode ID required'})
                }
            
            cur.execute("DELETE FROM episodes WHERE id = " + str(int(episode_id)))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'Episode deleted'})
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