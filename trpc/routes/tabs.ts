import db from '../../src/lib/db';
import { authProcedure, t } from '../t';
import z from 'zod';

export const tabRouter = t.router({
	getHomeLinks: authProcedure.query(async ({ ctx: { userId } }) => {
		if (!userId) return;

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
	}),
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
		}),
	delete: authProcedure
		.input(z.object({ tabId: z.string() }))
		.mutation(async ({ input: { tabId }, ctx: { userId } }) => {
			if (!userId) return;

			await db.link.delete({
				where: { uid: tabId }
			});

			return { success: true };
		}),
	makeHome: authProcedure
		.input(z.object({ tabId: z.string() }))
		.mutation(async ({ input: { tabId }, ctx: { userId } }) => {
			if (!userId) return;

			await db.link.update({ where: { uid: tabId }, data: { home: true } });

			return { success: true };
		})
});
