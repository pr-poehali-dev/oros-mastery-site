/**
 * Business: Cleanup test data from database
 * Args: event with httpMethod; context with requestId
 * Returns: HTTP response with cleanup results
 */

export const handler = async (event: any, context: any): Promise<any> => {
    const { httpMethod } = event;
    
    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            body: ''
        };
    }
    
    if (httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            isBase64Encoded: false,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const { Client } = require('pg');
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();

        const universeResult = await client.query(
            `DELETE FROM universes WHERE id IN (1, 2, 3, 4) RETURNING id`
        );

        const theoryResult = await client.query(
            `DELETE FROM theories WHERE id = 1 RETURNING id`
        );

        await client.end();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                success: true,
                deleted: {
                    universes: universeResult.rowCount,
                    theories: theoryResult.rowCount
                }
            })
        };
    } catch (error: any) {
        if (client) {
            await client.end();
        }
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                error: error.message
            })
        };
    }
};
