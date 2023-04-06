import { tabRouter } from './routes/tabs';
import { folderRouter } from './routes/folders';
import { t } from './t';

export const router = t.router({
	tabs: tabRouter,
	folders: folderRouter
});

export type Router = typeof router;
