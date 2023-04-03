import db from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

const userId = 'cleeh17rb000alh0wiru22w22';

export const POST = (async ({ request }) => {
	const body = await request.json();

	if (!body.title || !body.url) return new Response('Failed to create');
	const icon =
		body.favicon_url ?? `https://s2.googleusercontent.com/s2/favicons?domain=${body.url}&sz=256`;

	const link = await db.link.create({
		data: {
			alias: body.title,
			href: body.url,
			icon,
			home: false,
			userId
		}
	});

	console.log(link);

	return new Response('created link');
}) satisfies RequestHandler;
