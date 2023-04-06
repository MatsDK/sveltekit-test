import db from '../../src/lib/db';
import { authProcedure, t } from '../t';
import z from 'zod';

export const folderRouter = t.router({
	getAll: authProcedure.query(async ({ ctx: { userId } }) => {
		if (!userId) return;

		return db.folder.findMany({ where: { userId } });
	}),
	create: authProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.mutation(async ({ input: { name }, ctx: { userId } }) => {
			if (!userId) return;
			await db.folder.create({
				data: { name, userId }
			});

			return { success: true };
		}),
	clear: authProcedure
		.input(
			z.object({
				folderId: z.string().optional()
			})
		)
		.mutation(async ({ input: { folderId }, ctx: { userId } }) => {
			if (!userId) return;

			if (folderId)
				await db.link.deleteMany({
					where: { userId, folder_id: folderId }
				});
			else
				await db.link.deleteMany({
					where: { userId, folder_id: null, home: false }
				});

			return { success: true };
		}),
	rename: authProcedure
		.input(
			z.object({
				folderId: z.string(),
				newName: z.string()
			})
		)
		.mutation(async ({ input: { newName, folderId }, ctx: { userId } }) => {
			if (!userId) return;

			await db.folder.update({
				where: { uid: folderId },
				data: { name: newName }
			});

			return { success: true };
		}),
	delete: authProcedure
		.input(z.object({ folderId: z.string() }))
		.mutation(async ({ input: { folderId }, ctx: { userId } }) => {
			if (!userId) return;

			await db.link.deleteMany({
				where: { userId, folder_id: folderId }
			});

			await db.folder.delete({
				where: { uid: folderId }
			});

			return { success: true };
		})
});
