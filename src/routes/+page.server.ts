import db from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	return {
		todos: await db.todo.findMany(),
		session
	};
};
