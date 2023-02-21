import db from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		throw redirect(302, '/');
	}

	const userId = session.user.id;

	return {
		folders: await db.folder.findMany({
			where: { userId, parentFolder_id: null },
			include: { links: true, folders: true }
		}),
		links: await db.link.findMany({ where: { userId, folder_id: null } })
	};
}) satisfies PageServerLoad;

export const actions = {
	'create-home-link': async ({ request }) => {
		const data = await request.formData();
		const href = data.get('href')!.toString();
		const alias = data.get('alias')!.toString();
		const userId = data.get('userId')!.toString();

		const icon = `https://s2.googleusercontent.com/s2/favicons?domain=${href}&sz=256`;

		await db.link.create({
			data: { href, alias, userId, icon, home: true }
		});

		return { success: true };
	},
	'create-link': async ({ request }) => {
		const data = await request.formData();
		const href = data.get('href')!.toString();
		const alias = data.get('alias')!.toString();
		const userId = data.get('userId')!.toString();

		const icon = `https://s2.googleusercontent.com/s2/favicons?domain=${href}&sz=256`;

		await db.link.create({
			data: { href, alias, userId, icon, home: false }
		});

		return { success: true };
	},
	'create-folder': async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')!.toString();
		const userId = data.get('userId')!.toString();

		await db.folder.create({
			data: { userId, name }
		});

		return { success: true };
	}
} satisfies Actions;
