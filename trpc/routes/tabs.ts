import db from '../../src/lib/db';
import { authProcedure, t } from '../t';
import z from 'zod';

const getFoldersAndLinksById = async (userId: string, id: string | null) => {
	return {
		folders: await db.folder.findMany({
			where: { userId, parentFolder_id: id },
			include: {
				links: { orderBy: { createdAt: 'desc' } },
				folders: true
			}
		}),
		links: await db.link.findMany({
			where: { OR: [{ userId, folder_id: id }, { home: true }] },
			orderBy: {
				createdAt: 'desc'
			}
		})
	};
};

export const tabRouter = t.router({
	getHomeLinks: authProcedure.query(async ({ ctx: { userId } }) => {
		if (!userId) return;

		return getFoldersAndLinksById(userId, null);
	}),
	getLinks: authProcedure
		.input(z.object({ folderId: z.string().nullable() }))
		.query(async ({ ctx: { userId }, input: { folderId } }) => {
			if (!userId) return;

			return getFoldersAndLinksById(userId, folderId);
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
	rename: authProcedure
		.input(
			z.object({
				tabId: z.string(),
				newName: z.string()
			})
		)
		.mutation(async ({ input: { newName, tabId }, ctx: { userId } }) => {
			if (!userId) return;

			await db.link.update({
				where: { uid: tabId },
				data: { alias: newName }
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
