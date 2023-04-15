import db from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		throw redirect(302, '/');
	}

	const userId = session.user.id;

	return {
		folders: await db.folder.findMany({
			where: { userId, parentFolder_id: null },
			include: {
				links: { orderBy: { createdAt: 'desc' } },
				folders: true
			}
		}),
		links: await db.link.findMany({
			where: { userId, folder_id: null },
			orderBy: {
				createdAt: 'desc'
			}
		})
	};
}) satisfies PageServerLoad;
