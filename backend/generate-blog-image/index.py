'''
Business: Генерация уникальных изображений для статей блога
Args: event - dict с httpMethod, body (title статьи)
      context - object с request_id
Returns: HTTP response dict с URL изображения
'''

import json
import os
from typing import Dict, Any
import requests

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        title = body.get('title', 'Rick and Morty blog article')
        
        prompt = f"Rick and Morty themed illustration for blog article about: {title}. Vibrant colors, sci-fi style, cosmic background, portal effects, adventure theme"
        
        image_api_url = os.environ.get('IMAGE_GENERATION_API')
        if not image_api_url:
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({
                    'imageUrl': f'https://picsum.photos/seed/{hash(title)}/800/450'
                })
            }
        
        response = requests.post(
            image_api_url,
            json={'prompt': prompt},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'imageUrl': data.get('url')})
            }
        else:
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({
                    'imageUrl': f'https://picsum.photos/seed/{hash(title)}/800/450'
                })
            }
        
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({
                'imageUrl': 'https://picsum.photos/800/450'
            })
        }
