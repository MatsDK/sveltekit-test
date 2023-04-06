import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export const createContext = async (event: RequestEvent) => {
	const session = await event.locals.getSession();
	const userId = session?.user?.id;

	return { userId };
};

export type Context = inferAsyncReturnType<typeof createContext>;
