import db from '$lib/db';
import { authProcedure, t } from '$lib/trpc/t';
import z from 'zod';

export const tabRouter = t.router({
	create: authProcedure
		.input(
			z.object({
				href: z.string().url(),
				alias: z.string(),
				home: z.boolean().default(false),
				icon: z.string().optional(),
				folderId: z.string().optional()
			})
		)
		.mutation(async ({ input: { href, alias, home, icon, folderId }, ctx: { userId } }) => {
			if (!userId) return;
			icon = icon ?? `https://s2.googleusercontent.com/s2/favicons?domain=${href}&sz=256`;

			await db.link.create({
				data: { href, alias, userId, icon, home, folder_id: folderId }
			});

			return { success: true };
		})
});
