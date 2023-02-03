import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) {
		throw redirect(302, '/');
	}

	return { session };
}) satisfies LayoutServerLoad;
