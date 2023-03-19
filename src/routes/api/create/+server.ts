import db from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

const userId = "cleeh17rb000alh0wiru22w22"

export const POST = (async ({ request, }) => {
	const body = await request.json();

	if (!body.title || !body.url || !body.favicon_url) return new Response("Failed to create")
	console.log(body);

	const link = await db.link.create({
		data: {
			alias: body.title,
			href: body.url,
			icon: body.favicon_url,
			home: false,
			userId
		}
	})

	console.log(link);

	return new Response("created link");
}) satisfies RequestHandler;