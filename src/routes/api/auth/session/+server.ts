
import { getSession } from '@auth/sveltekit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ request, locals, cookies, }) => {
	const session = await locals.getSession()
	console.log(session, cookies.get("next-auth.session-token"));
	// const session = getSession(request.lo, {});
	// console.log(session);
	return new Response(JSON.stringify({ test: "x" }));
}) satisfies RequestHandler;