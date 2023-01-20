import db from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const text = data.get('text')!.toString();

		await db.todo.create({
			data: {
				created_at: new Date(),
				done: false,
				text
			}
		});

		throw redirect(302, '/');
	}
};
