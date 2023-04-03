import { tabRouter } from '$lib/trpc/routes/tabs';
import { folderRouter } from '$lib/trpc/routes/folders';
import { t } from '$lib/trpc/t';

export const router = t.router({
	tabs: tabRouter,
	folders: folderRouter
});

export type Router = typeof router;
