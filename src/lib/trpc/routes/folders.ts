import db from '$lib/db';
import { authProcedure, t } from '$lib/trpc/t';
import z from 'zod';

export const folderRouter = t.router({
	create: authProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.mutation(async ({ input: { name }, ctx: { userId } }) => {
			await db.folder.create({
				data: { name, userId }
			});

			return { success: true };
		})
});
