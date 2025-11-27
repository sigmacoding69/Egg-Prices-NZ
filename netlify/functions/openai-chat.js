// Netlify Function: Proxy OpenAI Chat Completions with CORS

const ALLOWED_ORIGIN = process.env.CORS_ALLOW_ORIGIN || '*';

const corsHeaders = {
	'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

exports.handler = async function (event) {
	if (event.httpMethod === 'OPTIONS') {
		return { statusCode: 204, headers: corsHeaders, body: '' };
	}

	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			headers: corsHeaders,
			body: JSON.stringify({ error: 'Method Not Allowed' }),
		};
	}

	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		return {
			statusCode: 500,
			headers: corsHeaders,
			body: JSON.stringify({ error: 'Server missing OPENAI_API_KEY' }),
		};
	}

	let body;
	try {
		body = JSON.parse(event.body || '{}');
	} catch {
		return {
			statusCode: 400,
			headers: corsHeaders,
			body: JSON.stringify({ error: 'Invalid JSON body' }),
		};
	}

	const {
		model = 'gpt-4o-mini',
		messages = [],
		max_tokens = 500,
		temperature = 0.7,
	} = body;

	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ model, messages, max_tokens, temperature }),
		});

		const data = await response.json();

		return {
			statusCode: response.status,
			headers: corsHeaders,
			body: JSON.stringify(data),
		};
	} catch (err) {
		return {
			statusCode: 502,
			headers: corsHeaders,
			body: JSON.stringify({ error: 'Upstream request failed', details: String(err) }),
		};
	}
};

