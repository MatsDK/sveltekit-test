import db from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getSession } from '@auth/sveltekit';

export const load = (async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		throw redirect(302, '/');
	}

	const userId = session.user.id;
	console.log(userId);

	return {
		folders: await db.folder.findMany({
			where: { userId, parentFolder_id: null },
			include: { links: true }
		}),
		links: await db.link.findMany({ where: { userId, folder_id: null } })
	};
}) satisfies PageServerLoad;

export const actions = {
	'create-home-link': async ({ request, cookies }) => {
		// TODO: extract userId from request data
		const data = await request.formData();
		const href = data.get('href')!.toString();
		const alias = data.get('alias')!.toString();

		let link = await db.link.create({
			data: { href, alias, userId: 'cldowhs5f0000lh0wbx1fuamu' }
		});

		return { success: true };
	}
} satisfies Actions;
